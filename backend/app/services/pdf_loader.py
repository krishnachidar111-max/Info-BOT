"""PDF text extraction service using pypdf with pdfplumber fallback."""
import pypdf
import pdfplumber
from pathlib import Path
from typing import List, Dict


def extract_text_from_pdf(file_path: str) -> List[Dict]:
    """
    Extract text from each page of a PDF.
    Returns a list of dicts: {page_num: int, text: str}
    """
    pages_data = []
    path = Path(file_path)

    if not path.exists():
        raise FileNotFoundError(f"PDF file not found: {file_path}")

    # Primary extractor: pypdf
    try:
        reader = pypdf.PdfReader(str(path))
        for i, page in enumerate(reader.pages):
            text = page.extract_text() or ""
            if text.strip():
                pages_data.append({"page_num": i + 1, "text": text.strip()})
    except Exception:
        pages_data = []

    # Fallback: pdfplumber (handles scanned / complex layouts better)
    if not pages_data:
        with pdfplumber.open(str(path)) as pdf:
            for i, page in enumerate(pdf.pages):
                text = page.extract_text() or ""
                if text.strip():
                    pages_data.append({"page_num": i + 1, "text": text.strip()})

    return pages_data


def get_page_count(file_path: str) -> int:
    """Return the number of pages in a PDF."""
    try:
        reader = pypdf.PdfReader(file_path)
        return len(reader.pages)
    except Exception:
        return 0
