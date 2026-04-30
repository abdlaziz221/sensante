# SénSanté

Assistant de santé communautaire avec IA.

## Stack technique 
- Next.js 14 (App Router)
- Tailwind CSS
- Prisma + PostgreSQL 
- Groq API (Llama 3)
- NextAuth.js
- Docker Compose 

## Installation 
```bash
npm install 
cp .env.example .env # puis remplir les valeurs 
npx prisma db push
npm run dev
```
### Configuration de l'authentification

Générer un secret NextAuth :

openssl rand -base64 32

Copier le résultat dans NEXTAUTH_SECRET du fichier .env.

Créer un compte agent de test :

curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"nom":"Admin","prenom":"Test","email":"admin@test.com","password":"123456"}'

## Équipe 
Licence 3 GLSI - ESP/UCAD - 2025-2026
