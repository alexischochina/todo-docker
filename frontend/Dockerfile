# Étape 1: Build - Utiliser une image Node.js pour construire l'application
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration des dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production && npm cache clean --force

# Copier le code source
COPY . .

# Construire l'application pour la production
RUN npm run build

# Étape 2: Production - Utiliser une image Node.js légère pour servir l'application
FROM node:18-alpine AS production

# Installer dumb-init pour une gestion correcte des signaux
RUN apk add --no-cache dumb-init

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nuxt -u 1001

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de configuration
COPY --from=builder --chown=nuxt:nodejs /app/package*.json ./

# Installer uniquement les dépendances de production
RUN npm ci --only=production && npm cache clean --force

# Copier l'application construite depuis l'étape de build
COPY --from=builder --chown=nuxt:nodejs /app/.output ./.output

# Changer vers l'utilisateur non-root
USER nuxt

# Exposer le port 3000
EXPOSE 3000

# Variables d'environnement
ENV NODE_ENV=production
ENV NITRO_PORT=3000
ENV NITRO_HOST=0.0.0.0

# Point d'entrée avec dumb-init pour une gestion correcte des signaux
ENTRYPOINT ["dumb-init", "--"]

# Commande pour démarrer l'application
CMD ["node", ".output/server/index.mjs"] 