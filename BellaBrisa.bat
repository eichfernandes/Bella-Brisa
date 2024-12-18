@echo off
REM Mudar para o diretório do script
cd /d "%~dp0"

echo ============================
echo Iniciando Sistema Web...
echo ============================
start "" http://localhost:3000
npm run start
IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao iniciar a aplicação. Encerrando.
    pause
    exit /b
)

echo ============================
echo Aplicação encerrada.
echo ============================
pause