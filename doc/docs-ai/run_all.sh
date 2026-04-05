#!/bin/bash
echo "Starting Docs AI Project..."

# Start Ollama in the background
echo "Starting Ollama Model..."
ollama run codellama:7b &

# Start Backend in the background
echo "Starting Python Backend..."
cd backend
python -m uvicorn app:app --reload &
cd ..

# Start Frontend in the background
echo "Starting Angular Frontend..."
cd frontend/docs-ai-ui
ng serve &

# Wait for all background processes to keep the script running
echo "All services are running in the background. Press Ctrl+C to stop them."
wait
