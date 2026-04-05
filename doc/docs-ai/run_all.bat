@echo off
echo Starting Docs AI Project...

echo [1/3] Starting Ollama Model...
start "Ollama Server" cmd /k "ollama run codellama:7b"

echo [2/3] Starting Python Backend...
start "FastAPI Backend" cmd /k "cd backend && python -m uvicorn app:app --reload"

echo [3/3] Starting Angular Frontend...
start "Angular Frontend" cmd /k "cd frontend\docs-ai-ui && ng serve"

echo All services are starting up in separate windows!
pause
