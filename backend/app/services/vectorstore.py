"""FAISS vector store management for SISTec Info Bot."""
import os
import json
import faiss
import numpy as np
from pathlib import Path
from typing import List, Dict, Optional
from app.utils.config import VECTORSTORE_DIR, TOP_K_CHUNKS
from app.services.embeddings import embed_texts, embed_query

# ── In-memory stores ──────────────────────────────────────────────────────────
_index: Optional[faiss.IndexFlatIP] = None   # Inner Product on normalised vecs ≡ cosine
_metadata: List[Dict] = []                    # parallel list to FAISS vectors
_dim: int = 384                               # all-MiniLM-L6-v2 output dim

INDEX_PATH = os.path.join(VECTORSTORE_DIR, "faiss.index")
META_PATH  = os.path.join(VECTORSTORE_DIR, "metadata.json")


# ── Persistence helpers ───────────────────────────────────────────────────────

def _save():
    os.makedirs(VECTORSTORE_DIR, exist_ok=True)
    if _index is not None:
        faiss.write_index(_index, INDEX_PATH)
    with open(META_PATH, "w", encoding="utf-8") as f:
        json.dump(_metadata, f, ensure_ascii=False)


def load_store():
    """Load FAISS index + metadata from disk on startup."""
    global _index, _metadata
    if os.path.exists(INDEX_PATH) and os.path.exists(META_PATH):
        _index = faiss.read_index(INDEX_PATH)
        with open(META_PATH, "r", encoding="utf-8") as f:
            _metadata = json.load(f)
        print(f"[VectorStore] Loaded {_index.ntotal} vectors from disk.")
    else:
        _index = faiss.IndexFlatIP(_dim)
        _metadata = []
        print("[VectorStore] Initialized fresh FAISS index.")


def _ensure_loaded():
    global _index
    if _index is None:
        load_store()


# ── Public API ────────────────────────────────────────────────────────────────

def add_chunks(chunks: List[Dict]) -> int:
    """Embed and add chunks to the FAISS index. Returns number of vectors added."""
    _ensure_loaded()
    texts = [c["text"] for c in chunks]
    embeddings = embed_texts(texts)            # (N, 384) float32, already normalised

    _index.add(embeddings)
    _metadata.extend(chunks)
    _save()
    return len(chunks)


def search(query: str, top_k: int = TOP_K_CHUNKS) -> List[Dict]:
    """
    Search the FAISS index for the most similar chunks.
    Returns list of result dicts with score (cosine similarity 0-1).
    """
    _ensure_loaded()
    if _index.ntotal == 0:
        return []

    q_emb = embed_query(query)                # (1, 384) float32, normalised
    k = min(top_k, _index.ntotal)
    scores, indices = _index.search(q_emb, k)

    results = []
    for score, idx in zip(scores[0], indices[0]):
        if idx < 0:
            continue
        meta = _metadata[idx].copy()
        meta["score"] = float(score)          # cosine similarity in [0, 1]
        results.append(meta)

    return results


def delete_by_doc_id(doc_id: int) -> int:
    """
    Remove all vectors belonging to a document.
    FAISS FlatIP doesn't support in-place deletion, so we rebuild the index.
    Returns number of vectors removed.
    """
    global _index, _metadata
    _ensure_loaded()

    keep_indices = [i for i, m in enumerate(_metadata) if m.get("doc_id") != doc_id]
    removed = len(_metadata) - len(keep_indices)

    if removed == 0:
        return 0

    kept_meta = [_metadata[i] for i in keep_indices]

    # Rebuild index from kept vectors
    new_index = faiss.IndexFlatIP(_dim)
    if keep_indices:
        kept_texts = [m["text"] for m in kept_meta]
        kept_embs  = embed_texts(kept_texts)
        new_index.add(kept_embs)

    _index    = new_index
    _metadata = kept_meta
    _save()
    return removed


def total_vectors() -> int:
    _ensure_loaded()
    return _index.ntotal
