# Lab Dashboard (v0.6) — Tests IA par L'Oracle

**Auteur :** Souleymane Sirima MBODJ (L'Oracle)
**Date :** 7 mai 2026
**Lab :** v0.6 — Dashboard

## Ma mission

Dans ce lab, mon rôle était simple : lancer le diagnostic IA sur les
10 consultations de test que Le Médecin avait créées. Sans ça, les
zones « Diagnostics IA » et « Alertes urgentes » du dashboard du
Pilote seraient restées vides.

## Comment j'ai procédé

1. J'ai vérifié que Le Gardien avait bien créé tous les patients de test.
2. J'ai vérifié que Le Médecin avait bien créé 10 consultations avec
   des symptômes différents.
3. Je suis allée sur la page `/consultations` et j'ai cliqué sur
   le bouton « Lancer le diagnostic IA » pour chacune des 10 consultations.
4. Je suis ensuite allée sur `/dashboard` pour vérifier que les
   chiffres et les graphiques s'affichaient bien.

## Résultats globaux

| KPI | Chiffre obtenu |
|---|---|
| Patients enregistrés | 15 |
| Consultations totales | 10 |
| Diagnostics IA terminés | 10 |
| Alertes urgentes | 10 |

## Détail des 10 diagnostics

| # | Patient | Région | Symptômes principaux | Diagnostic IA | Confiance |
|---|---|---|---|---|---|
| 1 | Oumou Ly | Sédhiou | Brûlures urinaires, douleurs pelviennes, fièvre légère | Infection urinaire ou cystite | 80 % |

| 2 | Fatou Ndiaye | Kaffrine | Maux de tête, nausées, sensibilité à la lumière | Migraine avec aura | 80 % |

| 3 | Jean Mendy | Kédougou | Fièvre longue, douleurs au ventre, éruption sur la peau | Paludisme ou autre maladie parasitaire | 80 % |

| 4 | Moussa Thiam | Diourbel | Sifflement quand il respire, essoufflement, toux la nuit | Asthme | 80 % |

| 5 | Mareme Tine | Saint-Louis | Fièvre élevée, douleurs articulaires, éruption | Dengue, chikungunya ou paludisme | 80 % |

| 6 | Mareme Ndiaye | Saint-Louis | Très soif, urines fréquentes, perte de poids | Suspicion de diabète de type 2 | 80 % |

| 7 | Fatou Sow | Kaffrine | Maux de tête sévères, vertiges, palpitations | Hypertension non contrôlée | 80 % |

| 8 | Astou Sy | Matam | Diarrhée, vomissements, déshydratation | Gastroentérite (probablement à cause de l'eau de puits) | 80 % |

| 9 | Fatou Mbodj | Kaffrine | Toux sèche, douleur dans la poitrine, fièvre | Pneumonie ou tuberculose | 70 % |

| 10 | Penda Sow | Kolda | Fièvre, frissons, maux de tête, courbatures | Paludisme ou dengue | 80 % |

## Ce que j'ai observé

### Beaucoup de maladies différentes

Les 10 diagnostics couvrent plein de maladies courantes au Sénégal :
des maladies infectieuses (paludisme, dengue, gastro, pneumonie,
tuberculose, infection urinaire), des maladies chroniques (diabète,
hypertension, asthme) et des problèmes neurologiques (migraine).
Ça mont