"""Embeddings service using sentence-transformers (all-MiniLM-L6-v2)."""
from sentence_transformers import SentenceTransformer
from typing import List
import numpy as np

# Singleton model — loaded once on startup
_model: SentenceTransformer | None = None


def get_model() -> SentenceTransformer:
    global _model
    if _model is None:
        print("[Embeddings] Loading sentence-transformers model...")
        _model = SentenceTransformer("all-MiniLM-L6-v2")
        print("[Embeddings] Model loaded.")
    return _model


def embed_texts(texts: List[str]) -> np.ndarray:
    """Embed a list of texts. Returns (N, D) numpy float32 array."""
    model = get_model()
    embeddings = model.encode(texts, convert_to_numpy=True, normalize_embeddings=True)
    return embeddings.astype("float32")


def embed_query(query: str) -> np.ndarray:
    """Embed a single query string. Returns (1, D) numpy float32 array."""
    return embed_texts([query])
