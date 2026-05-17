"""Google Gemini API — old google-generativeai SDK (uses requests, not httpx) + gemini-2.0-flash"""
import warnings
warnings.filterwarnings("ignore", category=FutureWarning, module="google")

import google.generativeai as genai
from typing import List, Dict
from app.utils.config import GEMINI_API_KEY, SIMILARITY_THRESHOLD

SYSTEM_PROMPT = """You are SISTec Info Bot — an AI assistant for Sagar Institute of Science and Technology (SISTec) Gandhi Nagar.

STRICT RULES:
1. Answer the user's question ONLY using the provided context from official SISTec documents.
2. Do NOT use any outside knowledge, general knowledge, or information not present in the context.
3. If the answer is not available in the provided context, respond EXACTLY with:
   "I could not find this information in the provided SISTec documents."
4. Keep answers simple, accurate, and student-friendly.
5. Always reference which document/page the information came from when possible.
6. Use bullet points or numbered lists for clarity when listing multiple items.
7. Do not make up, guess, or infer any information beyond what is explicitly stated in the context.
"""

_configured = False


def _configure():
    global _configured
    if not _configured:
        if not GEMINI_API_KEY:
            raise ValueError("GEMINI_API_KEY is not set in .env file.")
        genai.configure(api_key=GEMINI_API_KEY)
        _configured = True


def generate_answer(question: str, retrieved_chunks: List[Dict]) -> Dict:
    """Generate grounded answer using Gemini. Returns {answer, confidence, used_chunks}"""
    _configure()

    relevant_chunks = [c for c in retrieved_chunks if c.get("score", 0) >= SIMILARITY_THRESHOLD]

    if not relevant_chunks:
        return {
            "answer": "I could not find this information in the provided SISTec documents.",
            "confidence": 0.0,
            "used_chunks": [],
        }

    context_parts = []
    for i, chunk in enumerate(relevant_chunks, 1):
        source_label = f"[Source {i}: {chunk.get('filename', 'Unknown')}, Page {chunk.get('page_num', '?')}]"
        context_parts.append(f"{source_label}\n{chunk['text']}")
    context = "\n\n---\n\n".join(context_parts)

    full_prompt = (
        f"{SYSTEM_PROMPT}\n\n"
        f"CONTEXT FROM SISTEC DOCUMENTS:\n{context}\n\n"
        f"USER QUESTION: {question}\n\nANSWER:"
    )

    import time
    # Use gemini-2.0-flash — available in v1beta API
    model = genai.GenerativeModel("gemini-2.0-flash")
    try:
        response = model.generate_content(
            full_prompt,
            generation_config=genai.types.GenerationConfig(
                temperature=0.1,
                max_output_tokens=1024,
            ),
        )
    except Exception as e:
        err_str = str(e)
        if "429" in err_str or "quota" in err_str.lower() or "rate" in err_str.lower():
            return {
                "answer": "⏳ The AI is temporarily rate-limited (free tier limit). Please wait 60 seconds and try again.",
                "confidence": 0.0,
                "used_chunks": [],
            }
        raise

    answer_text = (
        response.text.strip()
        if response.text
        else "I could not find this information in the provided SISTec documents."
    )

    avg_score = sum(c.get("score", 0) for c in relevant_chunks) / len(relevant_chunks)
    confidence = round(min(avg_score * 100, 100), 1)

    return {
        "answer": answer_text,
        "confidence": confidence,
        "used_chunks": relevant_chunks,
    }
