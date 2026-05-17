"""FastAPI application entry point for SISTec Info Bot."""
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.db import init_db
from app.services.vectorstore import load_store
from app.routes import upload, chat, documents

# Ensure required directories exist
os.makedirs("uploads", exist_ok=True)
os.makedirs("vectorstore", exist_ok=True)

app = FastAPI(
    title="SISTec Info Bot API",
    description="RAG-powered AI assistant for SISTec Gandhi Nagar",
    version="2.0.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — allow React dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(upload.router, tags=["Upload"])
app.include_router(chat.router, tags=["Chat"])
app.include_router(documents.router, tags=["Documents"])


@app.on_event("startup")
async def startup_event():
    """Initialize database and load FAISS index on startup."""
    init_db()
    load_store()
    print("[SISTec Info Bot] Backend ready ✓")


@app.get("/", tags=["Health"])
async def root():
    return {
        "status": "ok",
        "message": "SISTec Info Bot API v2.0 is running.",
        "docs": "/docs",
    }


@app.get("/health", tags=["Health"])
async def health():
    from app.services.vectorstore import total_vectors
    return {
        "status": "healthy",
        "vectors_indexed": total_vectors(),
    }
