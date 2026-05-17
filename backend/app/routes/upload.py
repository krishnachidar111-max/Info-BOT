"""POST /upload — PDF upload, extraction, chunking, embedding, and storage."""
import os
import shutil
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.orm import Session
from app.database.db import get_db, Document
from app.services.pdf_loader import extract_text_from_pdf, get_page_count
from app.services.chunker import chunk_pages
from app.services.vectorstore import add_chunks
from app.utils.config import UPLOAD_DIR

router = APIRouter()

os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload")
async def upload_document(file: UploadFile = File(...), db: Session = Depends(get_db)):
    """Upload a PDF, process it through the RAG pipeline, and store embeddings."""

    if not file.filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported.")

    # 1. Save file to disk
    unique_name = f"{uuid.uuid4().hex}_{file.filename}"
    file_path = os.path.join(UPLOAD_DIR, unique_name)

    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # 2. Create DB record
    doc = Document(
        filename=unique_name,
        original_name=file.filename,
        file_path=file_path,
        status="processing",
    )
    db.add(doc)
    db.commit()
    db.refresh(doc)

    try:
        # 3. Extract text
        pages_data = extract_text_from_pdf(file_path)
        page_count = get_page_count(file_path)

        if not pages_data:
            doc.status = "error"
            db.commit()
            raise HTTPException(status_code=422, detail="Could not extract text from PDF. The file may be scanned/image-based.")

        # 4. Chunk
        chunks = chunk_pages(pages_data, doc_id=doc.id, filename=file.filename)

        # 5. Embed + store in FAISS
        added = add_chunks(chunks)

        # 6. Update DB record
        doc.chunk_count = added
        doc.page_count = page_count
        doc.status = "ready"
        db.commit()
        db.refresh(doc)

    except HTTPException:
        raise
    except Exception as e:
        doc.status = "error"
        db.commit()
        raise HTTPException(status_code=500, detail=f"Processing failed: {str(e)}")

    return {
        "id": doc.id,
        "filename": doc.original_name,
        "page_count": doc.page_count,
        "chunk_count": doc.chunk_count,
        "status": doc.status,
        "message": f"Successfully processed '{file.filename}' — {added} chunks indexed.",
    }
