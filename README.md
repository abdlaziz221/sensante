# SénSanté

Application web de santé communautaire intégrant une assistance par intelligence artificielle pour la gestion des patients, des consultations médicales et des tableaux de bord analytiques.

---

# Fonctionnalités

- Gestion des patients
- Gestion des consultations
- Authentification sécurisée avec NextAuth
- Tableau de bord statistique
- Assistance IA médicale avec Groq API (Llama 3)
- API REST avec Next.js App Router
- Base de données PostgreSQL avec Prisma ORM
- Déploiement conteneurisé avec Docker

---

# Stack Technique

- Next.js 15
- React
- TypeScript
- Tailwind CSS v4
- Prisma ORM
- PostgreSQL 16
- NextAuth.js
- Groq API
- Docker & Docker Compose

---

# Installation

## 1. Cloner le projet

```bash
git clone https://github.com/abdlaziz221/sensante.git
cd sensante
```

---

## 2. Installer les dépendances

```bash
npm install
```

---

## 3. Configurer les variables d’environnement

Créer un fichier `.env` à partir du modèle :

```bash
cp .env.example .env
```

Compléter ensuite les variables nécessaires :

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/sensante?schema=public"

GROQ_API_KEY="VOTRE_CLE_API"

NEXTAUTH_SECRET="VOTRE_SECRET"

NEXTAUTH_URL="http://localhost:3000"
```

---

## 4. Générer un secret NextAuth

### Linux / Mac / Git Bash

```bash
openssl rand -base64 32
```

### Windows PowerShell

```powershell
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copier ensuite le résultat dans :

```env
NEXTAUTH_SECRET=
```

---

# Lancement avec Docker

## Construire et démarrer les services

```bash
docker compose up --build
```

Application accessible sur :

```txt
http://localhost:3000
```

---

# Lancement sans Docker

## Générer Prisma Client

```bash
npx prisma generate
```

## Synchroniser la base de données

```bash
npx prisma db push
```

## Lancer le serveur de développement

```bash
npm run dev
```

---

# Création d’un compte de test

```bash
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Admin\",\"prenom\":\"Test\",\"email\":\"admin@test.com\",\"password\":\"123456\"}"
```

---

# Structure du Projet

```txt
src/
├── app/
├── components/
├── lib/
├── prisma/
└── public/
```

---

# Docker

Le projet utilise deux services principaux :

- Application Next.js
- Base de données PostgreSQL 16

---

# Équipe

Projet réalisé dans le cadre de la Licence 3 GLSI  
ESP / UCAD — Année universitaire 2025-2026