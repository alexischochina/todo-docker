# 🐳 Guide Docker - Frontend Todo App

Ce guide explique comment utiliser Docker avec le frontend de l'application Todo.

## 🚀 Démarrage rapide

### Option 1: Script automatisé (Recommandé)

```bash
# Construction et démarrage en une commande
./docker-build.sh run

# Accéder à l'application
open http://localhost:3000
```

### Option 2: Docker Compose

```bash
# Démarrer avec Docker Compose
docker compose up -d

# Arrêter
docker compose down
```

### Option 3: Docker classique

```bash
# Construction manuelle
docker build -t todo-frontend .

# Démarrage manuel
docker run -d -p 3000:3000 --name todo-frontend-container todo-frontend
```

## 📋 Commandes utiles

### Script docker-build.sh

```bash
./docker-build.sh build     # Construire l'image
./docker-build.sh run       # Démarrer le conteneur
./docker-build.sh stop      # Arrêter et supprimer le conteneur
./docker-build.sh logs      # Afficher les logs
./docker-build.sh clean     # Nettoyage complet
./docker-build.sh help      # Aide
```

### Docker Compose

```bash
docker compose up -d              # Démarrer en arrière-plan
docker compose up --build        # Reconstruire et démarrer
docker compose down               # Arrêter et supprimer
docker compose logs -f frontend   # Logs en temps réel
docker compose restart frontend   # Redémarrer le service
```

### Docker direct

```bash
docker ps                         # Lister les conteneurs
docker logs todo-frontend-container  # Voir les logs
docker exec -it todo-frontend-container sh  # Accès shell
docker stop todo-frontend-container    # Arrêter
docker rm todo-frontend-container      # Supprimer
docker rmi todo-frontend               # Supprimer l'image
```

## 🔧 Configuration

### Variables d'environnement

Copiez `env.example` vers `.env` et modifiez selon vos besoins :

```bash
cp env.example .env
```

Variables importantes :
- `NITRO_PORT=3000` - Port d'écoute
- `NUXT_PUBLIC_API_BASE` - URL du backend
- `NODE_ENV` - Environnement (development/production)

### Ports

- **Frontend** : 3000
- **Développement** : 3000 (aussi)

### Réseau Docker

Le frontend utilise le réseau `todo-network` pour communiquer avec les autres services.

## 🏗️ Architecture Docker

### Image multi-stage

L'image utilise une approche multi-stage pour optimiser la taille :

1. **Stage Builder** : Construction de l'application
2. **Stage Production** : Image finale légère avec seulement les fichiers nécessaires

### Sécurité

- Utilisateur non-root (`nuxt:nodejs`)
- `dumb-init` pour la gestion des signaux
- Image Alpine Linux légère

### Optimisations

- Cache des layers Docker optimisé
- Exclusion des fichiers inutiles via `.dockerignore`
- Nettoyage automatique du cache npm

## 📊 Monitoring

### Santé du conteneur

```bash
# Vérifier l'état de santé
docker inspect todo-frontend-container | grep -A 10 "Health"

# Logs de santé
docker logs todo-frontend-container | grep -i health
```

### Métriques

```bash
# Utilisation des ressources
docker stats todo-frontend-container

# Informations sur l'image
docker images todo-frontend
docker history todo-frontend
```

## 🔧 Dépannage

### Problèmes courants

1. **Port déjà utilisé**
   ```bash
   # Changer le port
   docker run -p 3001:3000 todo-frontend
   ```

2. **Problème de build**
   ```bash
   # Build sans cache
   docker build --no-cache -t todo-frontend .
   ```

3. **Conteneur qui ne démarre pas**
   ```bash
   # Voir les logs
   docker logs todo-frontend-container
   
   # Mode interactif pour debug
   docker run -it todo-frontend sh
   ```

### Nettoyage complet

```bash
# Avec le script
./docker-build.sh clean

# Manuel
docker stop todo-frontend-container || true
docker rm todo-frontend-container || true
docker rmi todo-frontend || true
docker system prune -f
```

## 🌐 Intégration

### Avec le backend

Quand le backend sera prêt, il suffira de :

1. Décommenter les sections dans `docker-compose.yml`
2. Mettre à jour `NUXT_PUBLIC_API_BASE`
3. Ajouter `depends_on: backend`

### Avec la base de données

L'application est prête pour recevoir des données via l'API backend.

## 📈 Performance

### Taille de l'image

- **Image finale** : ~463MB
- **Optimisée** pour la production
- **Multi-stage** pour réduire la taille

### Temps de build

- **Premier build** : ~30-40s
- **Builds suivants** : ~10-15s (cache)

## 🔄 CI/CD

L'image est prête pour être intégrée dans un pipeline CI/CD :

```bash
# Build pour CI
docker build -t registry/todo-frontend:$GIT_SHA .

# Push vers registre
docker push registry/todo-frontend:$GIT_SHA
```

## 📝 Notes importantes

- ✅ Frontend entièrement fonctionnel en standalone
- ✅ Prêt pour l'intégration backend
- ✅ Configuration via variables d'environnement
- ✅ Scripts d'automatisation inclus
- ✅ Documentation complète

L'application est maintenant prête pour la production et l'orchestration complète avec Docker Compose ! 