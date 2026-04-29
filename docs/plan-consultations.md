# Plan — Formulaire de Consultation (Le Médecin)

## Contexte
Ce document prépare le Lab Consultations (v0.4) du projet SénSanté.
Il définit les champs du formulaire de consultation et le format
des données, notamment pour les symptômes.

## Champs du formulaire de consultation

| Champ             | Type       | Obligatoire | Description                          |
|-------------------|------------|-------------|--------------------------------------|
| patientId         | Int (FK)   | Oui         | Référence vers le patient            |
| dateConsultation  | DateTime   | Oui         | Date et heure de la consultation     |
| motif             | String     | Oui         | Raison de la visite                  |
| symptomes         | String[]   | Oui         | Liste des symptômes déclarés         |
| diagnostic        | String     | Non         | Diagnostic posé                      |
| traitement        | String     | Non         | Traitement prescrit                  |
| notes             | String     | Non         | Observations libres                  |
| statut            | Enum       | Oui         | EN_COURS, TERMINEE, ANNULEE          |

## Format des symptômes
- Tableau de chaînes : `["fièvre", "toux", "fatigue"]`
- Saisie via champs dynamiques : bouton "Ajouter un symptôme"
- Stockage en JSON dans PostgreSQL (champ `symptomes String[]`)

## Modèle Prisma prévu

```prisma
model Consultation {
  id                Int       @id @default(autoincrement())
  patientId         Int
  patient           Patient   @relation(fields: [patientId], references: [id])
  dateConsultation  DateTime
  motif             String
  symptomes         String[]
  diagnostic        String?
  traitement        String?
  notes             String?
  statut            Statut    @default(EN_COURS)
  createdAt         DateTime  @default(now())
}

enum Statut {
  EN_COURS
  TERMINEE
  ANNULEE
}
