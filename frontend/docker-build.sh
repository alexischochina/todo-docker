#!/bin/bash

# Script de construction et déploiement Docker pour le frontend Todo App
# Usage: ./docker-build.sh [build|run|stop|logs|clean]

set -e

IMAGE_NAME="todo-frontend"
CONTAINER_NAME="todo-frontend-container"
PORT="3000"

# Couleurs pour les messages
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction pour afficher des messages colorés
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

# Fonction pour construire l'image Docker
build_image() {
    log_info "Construction de l'image Docker '$IMAGE_NAME'..."
    
    if docker build -t $IMAGE_NAME . ; then
        log_success "Image '$IMAGE_NAME' construite avec succès!"
        
        # Afficher la taille de l'image
        IMAGE_SIZE=$(docker images $IMAGE_NAME --format "table {{.Size}}" | tail -1)
        log_info "Taille de l'image: $IMAGE_SIZE"
    else
        log_error "Échec de la construction de l'image"
        exit 1
    fi
}

# Fonction pour démarrer le conteneur
run_container() {
    # Vérifier si le conteneur existe déjà
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_warning "Le conteneur '$CONTAINER_NAME' existe déjà"
        
        # Vérifier s'il est en cours d'exécution
        if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
            log_warning "Le conteneur est déjà en cours d'exécution"
            log_info "Application accessible sur: http://localhost:$PORT"
            return
        else
            log_info "Démarrage du conteneur existant..."
            docker start $CONTAINER_NAME
        fi
    else
        log_info "Démarrage d'un nouveau conteneur..."
        docker run -d -p $PORT:3000 --name $CONTAINER_NAME $IMAGE_NAME
    fi
    
    # Attendre que le conteneur soit prêt
    log_info "Attente du démarrage du conteneur..."
    sleep 3
    
    if docker ps | grep -q $CONTAINER_NAME; then
        log_success "Conteneur '$CONTAINER_NAME' démarré avec succès!"
        log_info "Application accessible sur: http://localhost:$PORT"
        log_info "Logs en temps réel: docker logs -f $CONTAINER_NAME"
    else
        log_error "Échec du démarrage du conteneur"
        exit 1
    fi
}

# Fonction pour arrêter et supprimer le conteneur
stop_container() {
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_info "Arrêt du conteneur '$CONTAINER_NAME'..."
        docker stop $CONTAINER_NAME
        log_success "Conteneur arrêté"
    else
        log_warning "Le conteneur '$CONTAINER_NAME' n'est pas en cours d'exécution"
    fi
    
    if docker ps -a --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_info "Suppression du conteneur '$CONTAINER_NAME'..."
        docker rm $CONTAINER_NAME
        log_success "Conteneur supprimé"
    fi
}

# Fonction pour afficher les logs
show_logs() {
    if docker ps --format '{{.Names}}' | grep -q "^${CONTAINER_NAME}$"; then
        log_info "Affichage des logs de '$CONTAINER_NAME'..."
        docker logs -f $CONTAINER_NAME
    else
        log_error "Le conteneur '$CONTAINER_NAME' n'est pas en cours d'exécution"
        exit 1
    fi
}

# Fonction de nettoyage
clean_all() {
    log_info "Nettoyage complet..."
    
    # Arrêter et supprimer le conteneur
    stop_container
    
    # Supprimer l'image
    if docker images --format '{{.Repository}}' | grep -q "^${IMAGE_NAME}$"; then
        log_info "Suppression de l'image '$IMAGE_NAME'..."
        docker rmi $IMAGE_NAME
        log_success "Image supprimée"
    else
        log_warning "L'image '$IMAGE_NAME' n'existe pas"
    fi
    
    # Nettoyer les images et conteneurs orphelins
    log_info "Nettoyage des ressources Docker non utilisées..."
    docker system prune -f
    log_success "Nettoyage terminé"
}

# Fonction d'aide
show_help() {
    echo "Usage: $0 [COMMAND]"
    echo ""
    echo "Commands:"
    echo "  build    Construire l'image Docker"
    echo "  run      Démarrer le conteneur (build automatique si nécessaire)"
    echo "  stop     Arrêter et supprimer le conteneur"
    echo "  logs     Afficher les logs du conteneur"
    echo "  clean    Nettoyer complètement (conteneur + image + cache)"
    echo "  help     Afficher cette aide"
    echo ""
    echo "Exemples:"
    echo "  $0 build && $0 run"
    echo "  $0 logs"
    echo "  $0 clean"
}

# Menu principal
case "${1:-help}" in
    "build")
        build_image
        ;;
    "run")
        # Construire l'image si elle n'existe pas
        if ! docker images --format '{{.Repository}}' | grep -q "^${IMAGE_NAME}$"; then
            log_info "Image '$IMAGE_NAME' non trouvée, construction automatique..."
            build_image
        fi
        run_container
        ;;
    "stop")
        stop_container
        ;;
    "logs")
        show_logs
        ;;
    "clean")
        clean_all
        ;;
    "help"|"--help"|"-h")
        show_help
        ;;
    *)
        log_error "Commande inconnue: $1"
        show_help
        exit 1
        ;;
esac 