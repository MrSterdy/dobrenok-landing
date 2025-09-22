#!/bin/bash

# Скрипт деплоя NextJS приложения Dobrenok Fund

set -e

# Цвета для вывода
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

log_info() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

log_warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Переменные
PROJECT_PATH=${NEXTJS_PROJECT_PATH:-"/var/www/dobrenok-landing"}
DOCKER_COMPOSE_FILE="docker-compose.prod.yml"
IMAGE_NAME=${IMAGE_NAME:-"ghcr.io/mrsterdy/dobrenok-landing:latest"}
BACKUP_DIR="${PROJECT_PATH}/backups"

# Создание директории для бэкапов
mkdir -p "$BACKUP_DIR"

# Функция для отката к предыдущей версии
rollback() {
    log_error "Выполняется откат к предыдущей версии..."

    # Остановка текущих контейнеров
    docker-compose -f "$DOCKER_COMPOSE_FILE" down

    # Запуск предыдущей версии
    docker-compose -f "$DOCKER_COMPOSE_FILE" up -d

    log_info "Откат завершен"
    exit 1
}

# Основная функция деплоя
deploy() {
    log_info "Начало развертывания NextJS Dobrenok Fund"

    # Переход в директорию проекта
    cd "$PROJECT_PATH"

    # Получение обновлений из Git
    log_info "Получение обновлений из Git..."
    git fetch origin main
    git reset --hard origin/main

    # Загрузка нового образа
    log_info "Загрузка нового Docker образа..."
    docker pull "$IMAGE_NAME"

    # Остановка текущих контейнеров
    log_info "Остановка текущих контейнеров..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" down --remove-orphans

    # Запуск новых контейнеров
    log_info "Запуск новых контейнеров..."
    docker-compose -f "$DOCKER_COMPOSE_FILE" up -d

    # Ожидание готовности приложения
    sleep 30

    # Очистка старых образов
    log_info "Очистка старых Docker образов..."
    docker image prune -f

    # Показать статус контейнеров
    log_info "Статус контейнеров:"
    docker-compose -f "$DOCKER_COMPOSE_FILE" ps

    log_info "Развертывание NextJS успешно завершено!"
}

# Обработка сигналов для корректного завершения
trap 'log_error "Развертывание прервано"; exit 1' INT TERM

# Запуск деплоя
deploy
