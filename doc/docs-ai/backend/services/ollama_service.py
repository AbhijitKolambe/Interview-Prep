import ollama
from config import MODEL_NAME

def ask_llm(context,question):

    prompt = f"""

You are a documentation AI.

Answer ONLY from the given documentation.

Documentation:
{context}

Question:
{question}

"""

    response = ollama.chat(
        model=MODEL_NAME,
        messages=[{"role":"user","content":prompt}]
    )

    return response["message"]["content"]
