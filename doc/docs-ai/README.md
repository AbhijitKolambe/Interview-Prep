# Docs AI

Docs AI is an AI-powered documentation assistant, built with:
- **FastAPI** Backend
- **ChromaDB** Vector Database
- **Sentence-Transformers** for Embeddings
- **Ollama** (codellama) for Local LLM interaction
- **Angular 17+** Frontend

## Setup Backend

1. Navigate to the `backend` folder:
    ```bash
    cd backend
    ```

2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```

3. Start Ollama and pull your model:
    ```bash
    ollama run codellama:7b
    ```

4. Index Documents:
    Add `.md` files to `data/docs`
    ```bash
    python ingest.py
    ```

5. Run FastAPI Application:
    ```bash
    uvicorn app:app --reload
    ```
    The API will be available at http://localhost:8000.

## Setup Frontend

1. Navigate to the frontend directory:
    ```bash
    cd frontend/docs-ai-ui
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Run the Angular development server:
    ```bash
    ng serve
    ```
    Access the UI at http://localhost:4200.
