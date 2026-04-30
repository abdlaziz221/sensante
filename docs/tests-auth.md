# Tests d'authentification - Lab Auth v0.3

## Date des tests
29/04/2026

## Comptes créés

| Rôle     | Email              | Mot de passe | Statut    |
|----------|--------------------|--------------|-----------|
| AGENT    | agent@test.sn      | agent123     | Créé      |
| MEDECIN  | medecin@test.sn    | medecin123   | Créé      |
| ADMIN    | admin@test.sn      | admin123     | Créé      |

## Résultats des tests

- [x] Inscription fonctionnelle (création compte + redirection login)
- [x] Connexion fonctionnelle (redirection /patients)
- [x] Nom affiché dans le header après connexion
- [x] Déconnexion fonctionnelle (retour état non connecté)
- [x] API patients protégée (401 si non connecté)
- [x] Message d'erreur si mauvais email ou mot de passe
- [x] Message d'erreur si email déjà utilisé à l'inscription
- [x] Validation des champs obligatoires à l'inscription

## Captures d'écran
- [x] Page login avec formulaire
- [x] Header avec nom de l'utilisateur connecté
- [x] Page patients accessible après connexion
- [x] Message d'erreur "Non autorisé" sur /api/patients sans connexion