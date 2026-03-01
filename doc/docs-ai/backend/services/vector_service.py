import chromadb
from config import VECTOR_DB

client = chromadb.PersistentClient(path=VECTOR_DB)

def get_collection():
    return client.get_or_create_collection("docs")

def reset_db():
    try:
        client.delete_collection("docs")
    except Exception:
        pass
    get_collection()

def store_vector(id,embedding,text):

    get_collection().upsert(
        ids=[id],
        embeddings=[embedding],
        documents=[text]
    )

def search_vectors(embedding,k=4):

    result = get_collection().query(
        query_embeddings=[embedding],
        n_results=k
    )

    return result["documents"][0]
