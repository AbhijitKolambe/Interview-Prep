from utils.markdown_loader import load_docs
from utils.text_chunker import split_text
from services.embedding_service import create_embedding
from services.vector_service import store_vector, reset_db
from config import DOC_PATH

docs = load_docs(DOC_PATH)

reset_db()

counter = 0

for doc in docs:

    chunks = split_text(doc["content"])

    for chunk in chunks:

        emb = create_embedding(chunk)

        store_vector(str(counter),emb,chunk)

        counter+=1

print("Docs indexed successfully")
