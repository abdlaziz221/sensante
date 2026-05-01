# Format IA - SénSanté

Petit doc pour préparer le lab v0.5 (l'IA). C'est ma partie en tant qu'Oracle, donc autant écrire ici comment je vois les choses avant d'attaquer le code Groq la semaine prochaine. Je vais essayer de pas juste décrire le format mais aussi expliquer pourquoi je fais les choix que je fais.

## C'est quoi le but ?

L'agent de santé saisit les symptômes d'un patient (lab v0.4, ce qu'on est en train de faire). Ensuite l'IA regarde ces symptômes et propose un pré-diagnostic. C'est juste une aide, le médecin garde le dernier mot évidemment.

Concrètement le flow ça donne :

consultation enregistrée -> on prend les symptômes -> on construit un prompt -> on envoie à Groq -> on récupère la réponse -> on update la consultation avec le diagnostic et le statut passe en "termine".

## Pourquoi Groq et pas autre chose ?

 Groq c'est le bon compromis pour ce qu'on fait : gratuit, rapide, qualité correcte. Pour un projet de prod ça serait à reconsidérer mais pour SénSanté en mode démo ça suffit largement.

## Pourquoi Llama 3.1 70B et pas le 8B ?

Le 8B est plus rapide et économe mais sur du raisonnement médical il fait n'importe quoi (j'ai testé vite fait sur le playground Groq, il invente des diagnostics). Le 70B est plus lent mais beaucoup plus fiable. Vu que la latence c'est pas critique (l'agent attend 1-2 secondes max), autant prendre le meilleur dispo gratuitement.

Modèle retenu : `llama-3.1-70b-versatile`.

## Les symptômes, c'est quoi comme format ?

Dans la base, les symptômes sont stockés en JSON dans la colonne `symptomes` de la table Consultation. C'est un simple tableau de strings :

```json
["Fièvre", "Toux", "Maux de tête", "Fatigue"]
```

Rien de compliqué. C'est cool parce qu'on n'a pas besoin de table séparée pour les symptômes.

Quelques remarques :
- minimum 1 symptôme sinon le formulaire bloque
- les valeurs viennent d'une liste fixe (les checkboxes du formulaire), donc pas de fautes de frappe à gérer
- accents OK, c'est de l'UTF-8

La liste actuelle (12 symptômes pour l'instant) : Fièvre, Toux, Maux de tête, Fatigue, Diarrhée, Vomissements, Douleur abdominale, Éruption cutanée, Frissons, Douleur thoracique, Essoufflement, Vertiges. On pourra en rajouter plus tard si besoin.

## Ce qu'on a en plus comme contexte

Vu qu'on a la relation Consultation -> Patient grâce à `include`, on peut aussi envoyer à l'IA :
- l'âge du patient (calculé depuis dateNaissance)
- son sexe
- la région (utile pour le palu par ex, contexte épidémio)
- les notes que l'agent a tapées

Plus on donne d'infos à l'IA, mieux le diagnostic devrait être. Faut juste pas en faire trop sinon le prompt devient trop long.

## Le prompt qu'on va envoyer

J'ai pensé à un truc dans ce style là (à affiner au lab v0.5) :

```
Tu es un assistant médical pour des agents de santé au Sénégal.
À partir des infos ci-dessous, propose UN diagnostic probable et
un niveau de confiance entre 0 et 100.

Patient : {age} ans, {sexe}, région de {region}
Symptômes : {liste des symptômes séparés par virgule}
Notes de l'agent : {notes}

Réponds UNIQUEMENT en JSON avec ce format :
{
  "diagnostic": "...",
  "confiance": ...,
  "justification": "..."
}
```

Le truc important c'est de forcer la réponse en JSON. Sinon on doit parser du texte libre et c'est galère, surtout que Llama peut faire des phrases avant le JSON. Groq a un mode `response_format: { type: "json_object" }` qui force ça, faudra l'utiliser.

## Exemple concret de bout en bout

Pour fixer les idées, prenons un cas type au Sénégal. Patient de 8 ans, garçon, région de Tambacounda (zone endémique palu), l'agent coche : Fièvre, Frissons, Maux de tête, Vomissements. Notes : "fièvre depuis 3 jours, sueurs nocturnes".

Ce qu'on enverrait :

```
Patient : 8 ans, masculin, région de Tambacounda
Symptômes : Fièvre, Frissons, Maux de tête, Vomissements
Notes de l'agent : fièvre depuis 3 jours, sueurs nocturnes
```

Réponse attendue de l'IA :

```json
{
  "diagnostic": "Paludisme probable",
  "confiance": 85,
  "justification": "Triade fièvre + frissons + sueurs en zone endémique chez un enfant. TDR palu fortement recommandé."
}
```

Et dans la base on update la consultation avec ces 3 valeurs + statut = "termine".

## La réponse qu'on attend

Genre quelque chose comme l'exemple au-dessus :

```json
{
  "diagnostic": "Paludisme suspect",
  "confiance": 78,
  "justification": "Combinaison fièvre + frissons + fatigue en région endémique."
}
```

Mapping vers la base :
- `diagnostic` -> dans `diagnosticIa`
- `confiance` -> dans `confiance`
- `justification` -> pour l'instant je sais pas trop, peut-être on l'ajoute aux notes ou on rajoute une colonne `justificationIa`. À voir avec Le Médecin.

Le `statut` passe de `en_attente` à `termine`.

## Les trucs qui peuvent foirer

Faut que je gère :
- timeout / pas de réseau -> on laisse en `en_attente`, message d'erreur côté UI
- l'IA renvoie un JSON cassé -> j'essaie de parser quand même mais sinon on log et on laisse en attente
- confiance trop basse (< 50 ?) -> afficher un warning à l'agent
- quota Groq dépassé -> message clair "essayez plus tard"

À discuter avec l'équipe si on retry automatiquement ou pas. Moi je dirais 1 retry max, sinon on saoule l'agent.

## Plan de tests

J'ai pas envie de juste cliquer une fois et dire "ça marche". Je vais préparer un set de cas connus et vérifier que l'IA donne des résultats cohérents :

1. **Palu typique** : fièvre + frissons + maux de tête, région de Kédougou, enfant 6 ans -> attendu : palu, confiance > 70
2. **Grippe** : fièvre + toux + fatigue + maux de tête, Dakar, adulte 30 ans -> attendu : grippe ou IRA
3. **Gastro** : diarrhée + vomissements + douleur abdo, n'importe où, ado 14 ans -> attendu : gastro-entérite
4. **Cas vague** : fatigue uniquement, adulte -> attendu : confiance basse (< 50), pas de diag fort
5. **Symptômes contradictoires** : éruption cutanée + douleur thoracique -> voir comment l'IA gère

Si l'IA donne des trucs n'importe quoi sur ces 5 cas, c'est qu'il faut retravailler le prompt. Je documenterai les résultats dans un petit tableau au lab v0.5.

## Réflexion éthique (important)

C'est de la santé, faut pas faire n'importe quoi. Quelques points qui me préoccupent et qu'il faudra adresser :

**Biais du modèle.** Llama 3 a été entraîné majoritairement sur des données occidentales. Pour des maladies tropicales (palu, dengue, fièvre typhoïde, schistosomiase) il peut être moins bon ou prioriser des diagnostics européens (genre proposer "grippe" alors qu'en zone endémique faut d'abord penser palu). C'est pour ça qu'on précise dans le prompt que c'est au Sénégal et qu'on donne la région.

**Sur-confiance des agents.** Le risque c'est que l'agent regarde juste le diag de l'IA et arrête de réfléchir. Surtout si l'IA met une confiance de 90%. Faut absolument afficher un avertissement style "Suggestion IA — la décision médicale reste celle de l'agent" et peut-être désactiver le diag visuel si confiance < 50%.

**Responsabilité.** Si un mauvais diagnostic est suivi et qu'il y a un problème, qui est responsable ? L'agent ? Le développeur ? On n'est pas un produit médical certifié, donc faut le dire clairement dans l'UI ET dans les conditions d'utilisation. Pour un projet étudiant on s'en sort en disant "outil pédagogique non destiné à un usage clinique réel".

**Confidentialité.** On envoie des données patient (âge, sexe, région, symptômes) à un serveur Groq aux US. C'est pas anonyme à 100% (même si y a pas de nom). Pour de la vraie production faudrait chiffrer, anonymiser plus, ou utiliser un modèle hébergé localement. Pour le projet on note la limite.

## Ce qu'on ne fait PAS (limites assumées)

Pour être honnête sur ce qu'on livre :
- pas de prise en compte des antécédents médicaux du patient (la BDD ne les stocke pas pour l'instant)
- pas de prise en compte des médicaments en cours
- pas de gestion fine des symptômes contradictoires
- pas de comparaison avec des consultations passées du même patient
- pas de proposition de traitement (volontairement, c'est trop sensible)
- un seul diagnostic proposé, pas de différentiel à plusieurs hypothèses
- pas de version offline (faut internet pour appeler Groq)

Toutes ces limites pourraient être adressées dans une v2 plus tard.

## Variables d'env

Dans `.env` (et faut pas oublier de mettre à jour `.env.example` !!) :

```
GROQ_API_KEY=gsk_xxxxxxxxx
GROQ_MODEL=llama-3.1-70b-versatile
```

Le modèle on peut changer si besoin. Surtout NE PAS COMMITER LA CLÉ.

## Important

L'IA c'est pas un médecin. Faut afficher clairement dans l'UI que c'est juste une suggestion et que la décision finale c'est l'agent qui la prend. Je rajouterai ça quand je ferai le composant d'affichage du diagnostic.

---

Voilà, ça pose les bases. Au lab v0.5 je reprendrai ce doc, je l'affinerai et je coderai vraiment le `groq.ts`. Si l'équipe a des remarques avant, faites signe.
