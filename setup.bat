@echo off
setlocal enabledelayedexpansion
chcp 65001 >nul
set COREPACK_ENABLE_DOWNLOAD_PROMPT=0
cls

echo 🔍 Verificando pnpm...
where pnpm >nul 2>nul
if %errorlevel% neq 0 (
    echo ⚠️  pnpm nao encontrado. Instalando via npm...
    call npm install -g pnpm >nul 2>&1

    where pnpm >nul 2>nul
    if !errorlevel! equ 0 (
        echo ✅ pnpm instalado com sucesso.
    ) else (
        echo ❌ Erro ao instalar pnpm.
        pause
        exit /b !errorlevel!
    )
) else (
    echo ✅ pnpm ja esta instalado.
)

echo 📄 Configurando variaveis de ambiente...
if not exist ".env" (
    (
    echo DB_USER=postgres
    echo DB_PASSWORD=admin
    echo DB_HOST=localhost
    echo DB_PORT=54321
    echo URL_PROVSQL=postgres://postgres:admin@localhost:54321/provsql_db
    echo URL_GPROM=postgres://postgres:admin@localhost:54321/gprom_db
    ) > .env
    echo ✅ Arquivo .env criado com valores padrao.
) else (
    echo ℹ️  Arquivo .env ja existe, pulando criacao.
)

echo 📦 Instalando dependencias do Node...
call pnpm install --reporter=silent

echo 🛠️  Construindo imagens Docker...
call pnpm docker:build
if %errorlevel% neq 0 (
    echo ❌ Erro ao construir a imagem Docker.
    pause
    exit /b %errorlevel%
)

echo 🚀 Iniciando containers...
call pnpm docker:start

echo ⏳ Aguardando o banco de dados ficar saudavel...
:wait_docker
for /f "tokens=*" %%i in ('docker inspect -f "{{.State.Health.Status}}" provlab 2^>nul') do set STATUS=%%i
if "!STATUS!"=="healthy" (
    goto :db_ready
) else (
    <nul set /p=.
    timeout /t 2 >nul
    goto :wait_docker
)

:db_ready
echo.
echo ✅ Banco de dados pronto!

echo 📦 Executando migracoes...
@call pnpm migrate > nul
if %errorlevel% equ 0 (
    echo ✅ Migrações e Seeds aplicados com sucesso!
    echo 🎉 Setup concluido com sucesso!
) else (
    echo ❌ Erro nas migrações. Rode 'pnpm migrate' manualmente para ver os logs.
    pause
    exit /b %errorlevel%
)

pause