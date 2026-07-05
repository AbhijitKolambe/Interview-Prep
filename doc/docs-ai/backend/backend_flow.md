# Docs AI - Detailed Backend Architecture & Execution Flow

This document provides a highly detailed, file-by-file breakdown of the Docs AI backend architecture. It covers the global configurations, utility scripts, ingestion sequence, request handling logic, and external system integrations.

---

## 1. Global Configurations (`config.py`)
This file acts as the source of truth for the environment settings used throughout the backend:
- `MODEL_NAME = "codellama:7b"`: The specific local Llama model queried via Ollama.
- `DOC_PATH = "data/docs"`: The directory where raw user `.md` documentation is stored.
- `VECTOR_DB = "data/vectordb"`: The directory where ChromaDB persistently stores our embeddings.
- `EMBED_MODEL = "all-MiniLM-L6-v2"`: A lightweight SentenceTransformer model used to convert text strings into dense mathematical vector arrays.
- `TOP_K = 4`: Determines how many document chunks we retrieve during a vector search.

---

## 2. Core Packages Utilized (`requirements.txt`)
- **`fastapi` & `uvicorn`**: Powers the high-performance async web API (allowing the creation of the `/ask` endpoint) and serves the API on localhost.
- **`chromadb`**: A native local Vector Database. We use `PersistentClient` to save vectors directly to our disk under `data/vectordb`.
- **`sentence-transformers`**: Handles the machine learning task of converting normal text into numerical vectors that represent the semantic meaning of that text.
- **`ollama`**: A Python client that interacts with the locally running Ollama daemon, enabling us to send specific prompts to the `codellama:7b` model and receive chat responses.

---

## 3. The Utilities Flow (`utils/`)

Before the system runs, we depend on two vital utility functions that structure our input data:

### `utils/markdown_loader.py`
Exposes the `load_docs(folder)` function. It uses `os.walk` to recursively scan through `data/docs/` and look for any file ending in `.md`. For every file it finds, it reads the content in `utf-8` and appends a dictionary (`{"content": text, "source": filename}`) to a global list.

### `utils/text_chunker.py`
Exposes the `split_text(text)` function. LLMs have a hard limit on how many tokens (words) they can read at once. Rather than feeding an entire long document to the AI, this script splits the full strings into small chunks of **500 characters** with an **overlap of 100 characters** (to maintain flow between chunks so context isn't lost perfectly at the character break).

---

## 4. Document Ingestion Lifecycle (`ingest.py`)

When you execute `python ingest.py`, it trains the system's memory by running this sequential logic:

1. **Load Data**: `docs = load_docs(DOC_PATH)` is called to load all markdown content.
2. **Database Reset**: `reset_db()` clears the existing `docs` collection in ChromaDB. This ensures that old data doesn't conflict with updated documentation.
3. **Iterative Processing**: Loop through each document loaded in Step 1.
4. **Chunking**: For the current doc, call `chunks = split_text(doc["content"])`.
5. **Embedding Creation**: For every chunk, call `create_embedding(chunk)`. The `all-MiniLM-L6-v2` model compresses the 500 characters into a list of floating-point numbers.
6. **Vector Storage**: Call `store_vector(str(counter), emb, chunk)`. ChromaDB stores a unique `id`, the `embeddings` (mathematical array), and the original plain text `documents` string.
7. Output `"Docs indexed successfully"` to terminal and close.

---

## 5. The API Execution Flow (`app.py`)

When the backend is running (`uvicorn app:app --reload`), it continually listens for traffic on the `@app.post("/ask")` endpoint. 

Here is exactly what happens when you send a payload like `{"question": "Where does Abhijit work?"}`:

### **Step 1: Payload Parsing (`app.py`)**
The request body is automatically validated and parsed into a Python object via the Pydantic `Query` BaseModel.
```python
@app.post("/ask")
def ask(q: Query):
```

### **Step 2: Question Vectorization (`services/embedding_service.py`)**
To search our database, we must convert the user's plain-text question into the exact same mathematical language used for our documents.
```python
embedding = create_embedding(q.question)
```
The exact `model.encode(text).tolist()` method is executed utilizing `all-MiniLM-L6-v2`.

### **Step 3: Similarity Search (`services/vector_service.py`)**
We pass the vector to our search service:
```python
docs = search_vectors(embedding)
# Inside vector_service.py, this fires:
# result = get_collection().query(query_embeddings=[embedding], n_results=4)
```
ChromaDB compares the numbers in the question's vector array against the numbers in *all* stored document array vectors. By calculating the mathematical "distance" (Cosine Similarity) between the vectors, it identifies the top 4 closest matching paragraphs and returns their original plain-text strings.
```python
context = "\n".join(docs)
```
The 4 strings are joined by newlines into one block of text known as the `context`.

### **Step 4: LLM Knowledge Synthesis (`services/ollama_service.py`)**
The `context` block and the user's `question` are passed to the `ask_llm()` method.
```python
answer = ask_llm(context, q.question)
```
Inside this service, the Python client shapes a highly specific system prompt:
```text
You are a documentation AI.
Answer ONLY from the given documentation.

Documentation:
[The 4 context blocks retrieved from ChromaDB]

Question:
[The user's original question]
```
This prompt is fired via `ollama.chat()` into the locally running daemon for `codellama:7b`. Because we commanded the model to restrict its knowledge strictly to the `[Documentation]`, it prevents "hallucinations" and answers beautifully using only our markdown context.

### **Step 5: API Response (`app.py`)**
The string returned by Ollama is packaged back into JSON form and sent down the network to the frontend (or swagger UI).
```python
return {"answer": answer}
```
