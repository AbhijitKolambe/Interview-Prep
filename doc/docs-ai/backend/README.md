# Docs AI - Backend Architecture and Workflow Documentation

Welcome to the **Docs AI** backend documentation. This comprehensive guide explains the entire lifecycle of the application—from reading Markdown documents and converting them into vector embeddings, to handling user queries through an LLM. It is designed to be easily understood by both current maintainers and new developers joining the project.

---

## 🏗️ 1. Tech Stack & Models Used

The backend is built using modern, fast, and local AI tools:

- **Web Framework:** **FastAPI** (with `uvicorn` as the server). Chosen for its high performance and automatic interactive API documentation.
- **Vector Database:** **ChromaDB**. An open-source vector database that runs locally (Persistent local storage) without needing a separate server.
- **Embedding Model:** `all-MiniLM-L6-v2` (via the `sentence_transformers` library). This model maps sentences & paragraphs to a 384-dimensional dense vector space and is highly optimized for semantic search.
- **LLM Context Engine:** `codellama:7b` (run locally via `ollama`). This is the language model that actually generates the answer based on the provided retrieved text.
- **Language:** **Python 3**

---

## 🚀 2. Getting Started & How to Run

There are two distinct phases to running this project. **Phase 1 must always be completed before Phase 2 when setting up or adding new documents.**

### Phase 1: Document Ingestion (Creating the Vector DB)
Before the AI can answer any questions, it must first "read" and store your documents.
1. Place all your knowledge base files (`.md` format) into the `data/docs` directory.
2. Run the ingestion script from the terminal:
   ```bash
   python ingest.py
   ```
   **Outcome:** You will see a `data/vectordb` folder created. This folder contains the SQLite database and metadata that ChromaDB uses to store your text and vectors.

### Phase 2: Starting the Backend API (Serving Queries)
Once the database is populated, start the API server to listen for user questions.
```bash
python -m uvicorn app:app --reload
```
- The API will be available at `http://127.0.0.1:8000`. 
- The `--reload` flag means the server will automatically restart if you modify the python files.

---

## 🧠 3. Core Workflows (How Things Work Under the Hood)

### A. How We Create the Vector DB (Ingestion Workflow)

The ingestion script (`ingest.py`) is the engine that processes your raw documents. Let's break down step-by-step what happens when you run it:

1. **Load Documents (`utils/markdown_loader.py`):**
   - The script walks through the `data/docs` directory looking for `.md` files.
   - It reads the entire text content of each file into memory as a list of dictionaries: `[{"content": "...", "source": "file.md"}]`.

2. **Reset the Database (`services/vector_service.py`):**
   - To avoid duplicate data when you re-run the script, it deletes the existing ChromaDB `docs` collection and creates a fresh one.

3. **Text Chunking (`utils/text_chunker.py`):**
   - LLMs and embedding models have "context limits" (they can't read an entire book at once).
   - The script splits the large Markdown text into smaller, overlapping portions (Chunks). 
   - **Default size:** 500 characters. **Overlap:** 100 characters. The overlap is crucial because it ensures sentences at the edges of chunks don't lose their context.

4. **Generate Embeddings (`services/embedding_service.py`):**
   - Each individual text chunk is passed into the `SentenceTransformer` model (`all-MiniLM-L6-v2`).
   - The model mathematically converts the text into a detailed list of numbers (a Vector Embedding). Deeply related concepts will have vectors that are mathematically "close" to each other.

5. **Store Vectors (`services/vector_service.py`):**
   - The actual text chunk, its numerical Vector Embedding, and an ID are permanently saved into the ChromaDB `docs` collection on your hard drive.

### B. How We Handle Responses (Query Workflow)

When a user submits a question from the frontend, it hits the `POST /ask` endpoint in `app.py`. Here is how the response is formulated:

1. **Receive the Request:**
   - The API receives a JSON payload `{"question": "How do I setup X?"}` which is validated by the `Query` Pydantic model.

2. **Embed the Question:**
   - The user's string question is passed to `create_embedding`. It is converted into a vector using the *exact same* `all-MiniLM-L6-v2` model used during ingestion. This is required so the math aligns.

3. **Vector Database Search (Retrieval):**
   - `search_vectors()` takes the question's vector and asks ChromaDB: *"Which 4 vectors in your database are mathematically closest to this question vector?"* (Top K = 4).
   - ChromaDB swiftly returns the 4 most relevant text chunks from your original Markdown files.

4. **Context Assembly:**
   - The API takes those 4 disconnected text chunks and stitches them together with line breaks (`\n`) into a single variable called `context`.

5. **LLM Query Generation (`services/ollama_service.py`):**
   - We construct a highly specific **Prompt** for the LLM. 
   - We give it the `context` (the facts retrieved from ChromaDB) and the `question` (what the user asked).
   - **Crucial System Instruction:** The prompt explicitly tells the LLM text engine: `"Answer ONLY from the given documentation"` to prevent hallucination (making things up).

6. **Return to User:**
   - The local `codellama:7b` model processes the prompt, reads the context, and generates a human-like response.
   - The API returns this to the frontend as `{"answer": "Here is how you setup X..."}`.

---

## 📂 4. Project Structure & File Roles

Understanding the file structure is key for anyone collaborating on this codebase:

```text
backend/
├── app.py                     # The FastAPI application setup and API endpoints.
├── config.py                  # Global settings (Model names, DB path, settings).
├── ingest.py                  # The standalone script to trigger Vector DB creation.
├── test_query.py              # A simple terminal script to test DB retrieval without the API.
├── requirements.txt           # Python dependencies.
├── data/                      
│   ├── docs/                  # Place your source Markdown files here.
│   └── vectordb/              # The auto-generated ChromaDB SQLite local storage.
├── services/                  # Business Logic Layer
│   ├── embedding_service.py   # Handles SentenceTransformer (Text -> Vector logic).
│   ├── ollama_service.py      # Handles LLM communication (Prompt -> Answer logic).
│   └── vector_service.py      # Handles ChromaDB interactions (Save/Search vectors).
└── utils/                     # Helper Functions
    ├── markdown_loader.py     # Script to crawl folders and read .md files safely.
    └── text_chunker.py        # Logic for splitting long text into overlapping chunks.
```

## 🛠️ 5. How to Customize

If you hand this off to someone or want to make changes, here is what you need to know:
- **Change the LLM?** Open `config.py` and modify `MODEL_NAME`. Ensure the model is installed locally via Ollama (`ollama pull <model-name>`).
- **Retrieve more context?** Open `config.py` and increase `TOP_K` (e.g., to 6 or 8). This gives the LLM more background, but uses more tokens and might slow down the response.
- **Change Chunk Size?** Check `utils/text_chunker.py` and adjust the default `chunk_size` from 500 characters to something larger if your document paragraphs are very long.

---
*This setup implements a classic **RAG (Retrieval-Augmented Generation)** architecture, keeping all data privacy local by refraining from using external APIs.*
