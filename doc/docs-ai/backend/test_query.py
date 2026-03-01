from services.embedding_service import create_embedding
from services.vector_service import search_vectors

q = "who is abhijit"
emb = create_embedding(q)
docs = search_vectors(emb)
print("CONTEXT RETRIEVED:")
for d in docs:
    print("---", d)
