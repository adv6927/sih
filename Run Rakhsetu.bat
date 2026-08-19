@echo off
set "ROOT=%~dp0"
start "Rakhsetu server" /b cmd /c "cd /d "%ROOT%" && npm.cmd run dev"
timeout /t 5 /nobreak >nul
start "" "http://localhost:3001/"