#!/bin/bash

# Script d'initialisation Git pour le frontend Todo Docker
# Usage: ./git-init.sh

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

if ! command -v git &> /dev/null; then
    log_error "Git n'est pas installé sur ce système"
    exit 1
fi

if [ -d ".git" ]; then
    log_warning "Ce répertoire est déjà un repository Git"
    read -p "Voulez-vous continuer et réinitialiser ? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        log_info "Opération annulée"
        exit 0
    fi
    log_info "Suppression de l'ancien repository Git..."
    rm -rf .git
fi

log_info "Initialisation du repository Git..."

git init

log_success "Repository Git initialisé"

if [ ! -f ".env" ] && [ -f "env.example" ]; then
    log_info "Création du fichier .env à partir de env.example..."
    cp env.example .env
    log_success "Fichier .env créé"
else
    log_warning "Le fichier .env existe déjà ou env.example est manquant"
fi

log_info "Configuration des paramètres Git recommandés..."

read -p "Entrez votre nom pour Git: " git_name
read -p "Entrez votre email pour Git: " git_email

if [ ! -z "$git_name" ]; then
    git config user.name "$git_name"
    log_success "Nom configuré: $git_name"
fi

if [ ! -z "$git_email" ]; then
    git config user.email "$git_email"
    log_success "Email configuré: $git_email"
fi

git config core.filemode false

git config core.autocrlf input

log_info "Ajout des fichiers au staging..."

git add .

log_info "Création du commit initial..."

git commit -m "🎉 Initial commit: Todo App Frontend

✨ Features:
- Nuxt.js 3 application with modern UI
- Docker containerization with multi-stage build
- Docker Compose orchestration ready
- Complete automation scripts
- Production-ready configuration

🐳 Docker:
- Optimized Dockerfile with Alpine Linux
- Non-root user for security
- Health checks configured
- Environment variables support

📦 Includes:
- Responsive Todo interface
- Local storage persistence
- Filter and statistics
- Backend API integration ready
- Comprehensive documentation"

log_success "Commit initial créé"

echo ""
log_info "🎉 Repository Git initialisé avec succès !"
echo ""
echo -e "${YELLOW}📋 Prochaines étapes suggérées :${NC}"
echo ""
echo "1. Ajouter une remote Git :"
echo "   git remote add origin <URL_DU_REPOSITORY>"
echo ""
echo "2. Pousser vers le repository distant :"
echo "   git push -u origin main"
echo ""
echo "3. Créer une branche de développement :"
echo "   git checkout -b develop"
echo ""
echo "4. Pour contribuer :"
echo "   git checkout -b feature/nouvelle-fonctionnalite"
echo ""
echo -e "${GREEN}✅ Le projet est maintenant prêt pour le développement !${NC}"

echo ""
log_info "État actuel du repository :"
git status --short
git log --oneline -1 