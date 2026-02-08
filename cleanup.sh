#!/bin/bash

echo "🗑️  Iniciando limpeza total do ambiente..."

if [ -f docker-compose.yml ]; then
    echo "🐳 Parando containers e removendo volumes..."
    docker-compose down -v
fi

echo "📂 Removendo dependências..."
rm -rf node_modules

echo "📄 Removendo arquivos de lock e ambiente..."
rm -f pnpm-lock.yaml
rm -f .env

echo "✨ Ambiente limpo com sucesso!"
echo "💡 Para começar de novo, execute: ./setup.sh"