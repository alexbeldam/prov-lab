#!/bin/bash

export COREPACK_ENABLE_DOWNLOAD_PROMPT=0

clear

echo "🔍 Verificando pnpm..."
if ! command -v pnpm &> /dev/null; then
    echo "⚠️  pnpm não encontrado. Instalando via npm..."
    npm install -g pnpm >/dev/null 2>&1
    
    if command -v pnpm &> /dev/null; then
        echo "✅ pnpm instalado com sucesso."
    else
        echo "❌ Erro ao instalar pnpm."
        exit 1
    fi
else
    echo "✅ pnpm já está instalado."
fi

echo "📄 Configurando variáveis de ambiente..."
if [ ! -f .env ]; then
    cat <<EOT > .env
DB_USER=postgres
DB_PASSWORD=admin
DB_HOST=localhost
DB_PORT=54321
URL_PROVSQL=postgres://postgres:admin@localhost:54321/provsql_db
URL_GPROM=postgres://postgres:admin@localhost:54321/gprom_db
EOT
    echo "✅ Arquivo .env criado com valores padrão."
else
    echo "ℹ️  Arquivo .env já existe, pulando criação."
fi

echo "📦 Instalando dependências do Node..."
pnpm install --reporter=silent

echo "🛠️  Construindo imagens Docker..."
if pnpm docker:build; then
    echo "✅ Build concluído."
else
    echo "❌ Erro no build do Docker."
    exit 1
fi

echo "🚀 Iniciando containers..."
pnpm docker:start

echo -n "⏳ Aguardando o banco de dados ficar saudável..."
until [ "$(docker inspect -f '{{.State.Health.Status}}' provlab 2>/dev/null)" == "healthy" ]; do
    printf "."
    sleep 2
done

echo -e "\n✅ Banco de dados pronto!"

echo "📦 Executando migrações..."
if pnpm migrate > /dev/null 2>&1; then
    echo "✅ Migrações e Seeds aplicados com sucesso!"
    echo "🎉 Setup concluído com sucesso!"
else
    echo "❌ Erro nas migrações. Rode 'pnpm migrate' manualmente para ver os logs."
    exit 1
fi