"""Text chunking service for RAG pipeline."""
from langchain_text_splitters import RecursiveCharacterTextSplitter
from typing import List, Dict
from app.utils.config import CHUNK_SIZE, CHUNK_OVERLAP


def chunk_pages(pages_data: List[Dict], doc_id: int, filename: str) -> List[Dict]:
    """
    Takes extracted pages and returns a list of chunks.
    Each chunk dict: {text, doc_id, filename, page_num, chunk_index}
    """
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=CHUNK_SIZE,
        chunk_overlap=CHUNK_OVERLAP,
        separators=["\n\n", "\n", ". ", " ", ""],
    )

    all_chunks = []
    chunk_index = 0

    for page in pages_data:
        page_text = page["text"]
        page_num = page["page_num"]

        if not page_text.strip():
            continue

        raw_chunks = splitter.split_text(page_text)

        for raw in raw_chunks:
            if raw.strip():
                all_chunks.append({
                    "text": raw.strip(),
                    "doc_id": doc_id,
                    "filename": filename,
                    "page_num": page_num,
                    "chunk_index": chunk_index,
                })
                chunk_index += 1

    return all_chunks
