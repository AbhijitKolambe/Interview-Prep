from sentence_transformers import SentenceTransformer
from config import EMBED_MODEL

model = SentenceTransformer(EMBED_MODEL)

def create_embedding(text):

    return model.encode(text).tolist()
