#!/bin/bash

# Verifica se uma tag foi fornecida como argumento
if [ -z "$1" ]; then
  echo "Uso: $0 <tag>"
  exit 1
fi

# Atribui a tag fornecida para uma variável
TAG=$1

# Nome da imagem base
IMAGE_NAME="financas-em-ordem"

# Repositório Docker
REPO="vshub.vstec.net/financas-em-ordem/$IMAGE_NAME"

docker login vshub.vstec.net -u financas-em-ordem -p AVNS_pbpmErVp0j43sIFI_0M

# Construir a imagem Docker com a tag fornecida
docker build -t $IMAGE_NAME:$TAG .

# Taggear a imagem com a tag fornecida
docker tag $IMAGE_NAME:$TAG $REPO:$TAG

# Push da imagem com a tag fornecida
docker push $REPO:$TAG

# Taggear a imagem como 'latest'
docker tag $REPO:$TAG $REPO:latest

# Push da imagem 'latest'
docker push $REPO:latest

echo "Deploy completado com sucesso!"
