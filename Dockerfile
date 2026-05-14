# 1. Image de base : Node.js 20 sur Alpine Linux
FROM node:20-alpine

RUN apk add --no-cache openssl

# 2. Répertoire de travail
WORKDIR /app

# 3. Copier package files
COPY package.json package-lock.json ./

# 4. Installer les dépendances
RUN npm ci

# 5. Copier le reste du projet
COPY . .

# Variables nécessaires au build Next.js
ARG DATABASE_URL
ARG NEXTAUTH_SECRET
ARG NEXTAUTH_URL
ARG GROQ_API_KEY

ENV DATABASE_URL=$DATABASE_URL
ENV NEXTAUTH_SECRET=$NEXTAUTH_SECRET
ENV NEXTAUTH_URL=$NEXTAUTH_URL
ENV GROQ_API_KEY=$GROQ_API_KEY

# 6. Prisma
RUN npx prisma generate

# 7. Build Next.js
RUN npm run build

# 8. Port
EXPOSE 3000

# 9. Start
CMD ["npm", "start"]