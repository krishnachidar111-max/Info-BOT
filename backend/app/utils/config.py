import os
from dotenv import load_dotenv

load_dotenv()

GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
GROQ_API_KEY: str = os.getenv("GROQ_API_KEY", "")
UPLOAD_DIR: str = "uploads"
VECTORSTORE_DIR: str = "vectorstore"
DATABASE_URL: str = "sqlite:///./sistec.db"

# RAG settings
CHUNK_SIZE: int = 900
CHUNK_OVERLAP: int = 150
TOP_K_CHUNKS: int = 5
SIMILARITY_THRESHOLD: float = 0.35   # cosine distance — lower = more similar for FAISS L2
