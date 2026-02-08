@echo off
setlocal
chcp 65001 >nul
cls

echo 🗑️  Iniciando limpeza total do ambiente...

if exist docker-compose.yml (
    echo 🐳 Parando containers e removendo volumes...
    docker-compose down -v
)

echo 📂 Removendo dependências...

if exist node_modules (
    echo   [-] node_modules
    rd /s /q node_modules
)

echo 📄 Removendo arquivos de lock e ambiente...

if exist pnpm-lock.yaml (
    echo   [-] pnpm-lock.yaml
    del /f /q pnpm-lock.yaml
)

if exist .env (
    echo   [-] .env
    del /f /q .env
)

echo.
echo ✨ Ambiente limpo com sucesso!
echo 💡 Para começar de novo, execute: ./setup.bat
pause