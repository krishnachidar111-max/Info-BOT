"""GET /documents & DELETE /documents/{id}."""
import os
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db, Document
from app.services.vectorstore import delete_by_doc_id

router = APIRouter()


@router.get("/documents")
async def list_documents(db: Session = Depends(get_db)):
    """Return all uploaded documents."""
    docs = db.query(Document).order_by(Document.created_at.desc()).all()
    return [
        {
            "id": d.id,
            "filename": d.original_name,
            "page_count": d.page_count,
            "chunk_count": d.chunk_count,
            "status": d.status,
            "created_at": d.created_at.isoformat(),
        }
        for d in docs
    ]


@router.delete("/documents/{doc_id}")
async def delete_document(doc_id: int, db: Session = Depends(get_db)):
    """Delete a document's metadata, file, and FAISS vectors."""
    doc = db.query(Document).filter(Document.id == doc_id).first()
    if not doc:
        raise HTTPException(status_code=404, detail="Document not found.")

    # Remove from FAISS
    removed_vectors = delete_by_doc_id(doc_id)

    # Remove file from disk
    if os.path.exists(doc.file_path):
        os.remove(doc.file_path)

    # Remove from DB
    db.delete(doc)
    db.commit()

    return {
        "message": f"Document '{doc.original_name}' deleted successfully.",
        "vectors_removed": removed_vectors,
    }
