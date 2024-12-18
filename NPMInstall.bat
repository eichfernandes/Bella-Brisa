@echo off
REM Mudar para o diretório do script
cd /d "%~dp0"

echo ============================
echo Instalando Dependencias...
echo ============================
npm install
IF %ERRORLEVEL% NEQ 0 (
    echo Erro ao iniciar a aplicação. Encerrando.
    pause
    exit /b
)

echo ============================
echo Aplicação encerrada.
echo ============================
pause