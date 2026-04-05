# How to Run the Docs AI Project

This document outlines the step-by-step terminal commands required to run the Backend and Frontend of the Docs AI application.

## 1. Start the Local LLM (Ollama)
Before the backend can answer any questions, it must connect to the local language model. 
1. Open a new terminal.
2. Run the following command:
```bash
ollama run codellama:7b
```
*Note: Keep this terminal window open in the background so the model stays active.*

## 2. Ingest New Documents (Data Training)
If you have updated or added new `.md` files in the `backend/data/docs` directory, you need to re-index the vector database.
1. Open a terminal and navigate to the backend folder:
```bash
cd d:\Interview-Prep\doc\docs-ai\backend
```
2. Run the ingest script:
```bash
python ingest.py
```
*Wait for it to say `Docs indexed successfully` before proceeding.*

## 3. Start the FastAPI Backend
Start the backend server so it can receive requests from the frontend or tools like Postman.
1. Open a terminal and navigate to the backend folder (if you aren't already there):
```bash
cd d:\Interview-Prep\doc\docs-ai\backend
```
2. Run the application:
```bash
python -m uvicorn app:app --reload
```
*The backend API will now be running at `http://127.0.0.1:8000`. You can visit `http://127.0.0.1:8000/docs` to test the `/ask` endpoint using the interactive UI.*

## 4. Start the Angular Frontend
To run the web application interface:
1. Open a new terminal and navigate to your frontend directory:
```bash
cd d:\Interview-Prep\doc\docs-ai\frontend\docs-ai-ui
```
2. Install dependencies (if this is your first time running it):
```bash
npm install
```
3. Start the Angular server:
```bash
ng serve
```
*You can now open your browser and navigate to `http://localhost:4200` to interact with the full application.*

---

## 5. Run Everything With a Single Command
To save time, if you are using **PowerShell**, you can paste and run this single command to open three separate terminal windows automatically—one for Ollama, one for the Python Backend, and one for the Angular Frontend:

```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "ollama run codellama:7b"; Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd d:\Interview-Prep\doc\docs-ai\backend; python -m uvicorn app:app --reload"; Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd d:\Interview-Prep\doc\docs-ai\frontend\docs-ai-ui; ng serve"
```
*(This triggers all your environments to start at the exact same time without manually opening multiple tabs!)*
