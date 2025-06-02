# 📝 Todo App Frontend

Application de gestion de tâches développée avec **Nuxt.js 3** et **Vue.js 3**, entièrement dockerisée.

## 🚀 Fonctionnalités

- ✅ Ajouter, modifier et supprimer des tâches
- 🔍 Filtrer les tâches (toutes, en cours, terminées)
- 📊 Statistiques en temps réel
- 💾 Persistance locale avec LocalStorage
- 📱 Interface responsive et moderne
- 🐳 Complètement dockerisée

## 🛠️ Technologies

- **Nuxt.js 3** - Framework Vue.js full-stack
- **Vue.js 3** - Framework JavaScript réactif
- **TypeScript** - Pour un développement plus robuste
- **Docker** - Containerisation
- **CSS3** - Styles modernes et animations

## ⚡ Démarrage rapide

### Option 1: Script tout-en-un (Recommandé)

```bash
# Initialiser Git et Docker en une fois
./git-init.sh && ./docker-build.sh run

# Accéder à l'application
open http://localhost:3000
```

### Option 2: Docker seulement

```bash
./docker-build.sh run
```

## 🐳 Docker

### Construction de l'image

```bash
# Depuis le répertoire frontend/
docker build -t todo-frontend .
```

### Démarrage du conteneur

```bash
# Démarrer en mode production
docker run -d -p 3000:3000 --name todo-frontend-container todo-frontend

# Démarrer en mode interactif pour les logs
docker run -p 3000:3000 --name todo-frontend-container todo-frontend
```

### Variables d'environnement

- `NITRO_PORT` : Port d'écoute (défaut: 3000)
- `NITRO_HOST` : Host d'écoute (défaut: 0.0.0.0)
- `NUXT_PUBLIC_API_BASE` : URL de l'API backend (défaut: http://localhost:8080/api)

## 🔧 Scripts disponibles

### Docker
```bash
./docker-build.sh build     # Construire l'image
./docker-build.sh run       # Démarrer le conteneur
./docker-build.sh stop      # Arrêter et supprimer
./docker-build.sh logs      # Afficher les logs
./docker-build.sh clean     # Nettoyage complet
```

### Git
```bash
./git-init.sh               # Initialiser le repository Git
```

### npm/yarn
```bash
npm run dev                 # Développement
npm run build               # Build production
npm run preview             # Prévisualiser le build
```

## 💻 Développement local

### Prérequis

- Node.js 18+ 
- npm ou yarn
- Git
- Docker (optionnel)

### Installation

```bash
# 1. Initialiser Git (si pas déjà fait)
./git-init.sh

# 2. Installer les dépendances
npm install

# 3. Copier les variables d'environnement
cp env.example .env

# 4. Démarrer en développement
npm run dev
```

## 🔧 Configuration

La configuration se trouve dans `nuxt.config.ts` :

- **Port de développement** : 3000
- **Rendu côté serveur** : Activé
- **Variables d'environnement** : Configurées via runtimeConfig

## 🌐 Accès à l'application

Une fois démarrée, l'application est accessible sur :
- **Développement** : http://localhost:3000
- **Production** : http://localhost:3000 (ou le port configuré)

## 📁 Structure du projet

```
frontend/
├── app.vue              # Composant principal
├── nuxt.config.ts       # Configuration Nuxt
├── package.json         # Dépendances et scripts
├── Dockerfile           # Configuration Docker
├── docker-compose.yml   # Orchestration Docker
├── docker-build.sh      # Script Docker automatisé
├── git-init.sh          # Script d'initialisation Git
├── .dockerignore        # Fichiers exclus du build Docker
├── .gitignore           # Fichiers exclus de Git
├── env.example          # Variables d'environnement exemple
├── README.md           # Documentation
└── DOCKER.md           # Guide Docker détaillé
```

## 🔄 Git et versioning

### Initialisation

```bash
# Initialiser le repository avec configuration optimale
./git-init.sh
```

### Workflow recommandé

```bash
# Créer une branche pour une nouvelle fonctionnalité
git checkout -b feature/nouvelle-fonctionnalite

# Faire vos modifications
# ...

# Committer vos changements
git add .
git commit -m "✨ Add: nouvelle fonctionnalité"

# Pousser la branche
git push -u origin feature/nouvelle-fonctionnalite
```

### Convention de commits

- `✨ Add:` - Nouvelle fonctionnalité
- `🐛 Fix:` - Correction de bug
- `📝 Docs:` - Mise à jour documentation
- `🎨 Style:` - Amélioration UI/CSS
- `♻️ Refactor:` - Refactoring code
- `🐳 Docker:` - Modifications Docker
- `🔧 Config:` - Changements configuration

## 🚀 Intégration future

L'application est préparée pour l'intégration avec :
- **Backend API** : Configuration API_BASE prête
- **Base de données** : Via les appels API backend
- **Authentification** : Structure extensible

## 📈 Prochaines étapes

1. ✅ Frontend dockerisé
2. ✅ Git repository configuré
3. ⏳ Backend API (en cours)
4. ⏳ Base de données
5. ⏳ Docker Compose pour l'orchestration
6. ⏳ CI/CD Pipeline

## 🤝 Contribution

1. Fork le projet
2. Créer une branche pour votre fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m '✨ Add: AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📝 Notes

- L'application fonctionne actuellement en mode standalone avec LocalStorage
- Prête pour l'intégration backend via l'API configurée
- Architecture scalable et maintenable
- Scripts d'automatisation pour Docker et Git inclus
