"""POST /ask & GET /history — Chat endpoints."""
import json
import traceback
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from app.database.db import get_db, ChatHistory
from app.services.vectorstore import search, total_vectors
from app.services.groq_service import generate_answer
from app.utils.config import TOP_K_CHUNKS

router = APIRouter()


class AskRequest(BaseModel):
    question: str


@router.post("/ask")
async def ask_question(req: AskRequest, db: Session = Depends(get_db)):
    """Accept a question, retrieve relevant chunks, and generate a grounded answer."""

    question = req.question.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    if total_vectors() == 0:
        return {
            "answer": "No documents have been uploaded yet. Please upload SISTec documents first.",
            "sources": [],
            "confidence": 0.0,
        }

    try:
        # 1. Retrieve top-k chunks via FAISS cosine similarity
        retrieved = search(question, top_k=TOP_K_CHUNKS)

        # 2. Generate grounded answer using Gemini
        result = generate_answer(question, retrieved)

    except Exception as e:
        error_detail = traceback.format_exc()
        print(f"[ERROR in /ask] {error_detail}")
        # Return the actual error message to help debugging
        raise HTTPException(
            status_code=500,
            detail=f"AI generation failed: {str(e)}"
        )

    # 3. Persist to chat history
    sources_payload = [
        {
            "text": c["text"],
            "filename": c.get("filename", ""),
            "page_num": c.get("page_num", 0),
            "score": round(c.get("score", 0), 4),
        }
        for c in result["used_chunks"]
    ]

    try:
        history_entry = ChatHistory(
            question=question,
            answer=result["answer"],
            sources=json.dumps(sources_payload),
            confidence=result["confidence"],
        )
        db.add(history_entry)
        db.commit()
    except Exception as e:
        print(f"[WARNING] Could not save chat history: {e}")

    return {
        "answer": result["answer"],
        "sources": sources_payload,
        "confidence": result["confidence"],
    }


@router.get("/history")
async def get_history(limit: int = 50, db: Session = Depends(get_db)):
    """Return the last N chat history entries."""
    entries = (
        db.query(ChatHistory)
        .order_by(ChatHistory.timestamp.desc())
        .limit(limit)
        .all()
    )

    return [
        {
            "id": e.id,
            "question": e.question,
            "answer": e.answer,
            "sources": json.loads(e.sources) if e.sources else [],
            "confidence": e.confidence,
            "timestamp": e.timestamp.isoformat(),
        }
        for e in entries
    ]
