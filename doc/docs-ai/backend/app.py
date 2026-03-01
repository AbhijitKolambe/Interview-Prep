from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from services.embedding_service import create_embedding
from services.vector_service import search_vectors
from services.ollama_service import ask_llm

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Query(BaseModel):

    question:str

@app.post("/ask")

def ask(q:Query):

    embedding = create_embedding(q.question)

    docs = search_vectors(embedding)

    context = "\n".join(docs)

    answer = ask_llm(context,q.question)

    return {"answer":answer}
