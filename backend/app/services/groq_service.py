"""Groq API integration using built-in urllib for fast inference."""
import json
import urllib.request
import urllib.error
from typing import List, Dict
from app.utils.config import GROQ_API_KEY, SIMILARITY_THRESHOLD

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

def generate_answer(question: str, retrieved_chunks: List[Dict]) -> Dict:
    """Generate grounded answer using Groq API. Returns {answer, confidence, used_chunks}"""
    if not GROQ_API_KEY:
        raise ValueError("GROQ_API_KEY is not set in .env file.")

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

    user_prompt = (
        f"CONTEXT FROM SISTEC DOCUMENTS:\n{context}\n\n"
        f"USER QUESTION: {question}\n\nANSWER:"
    )

    url = "https://api.groq.com/openai/v1/chat/completions"
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "llama3-8b-8192",  # Fast and effective model on Groq
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt}
        ],
        "temperature": 0.1,
        "max_tokens": 1024,
    }

    data_bytes = json.dumps(data).encode('utf-8')
    req = urllib.request.Request(url, data=data_bytes, headers=headers, method='POST')

    try:
        with urllib.request.urlopen(req) as response:
            response_data = json.loads(response.read().decode('utf-8'))
            answer_text = response_data["choices"][0]["message"]["content"].strip()
    except urllib.error.HTTPError as e:
        if e.code == 429:
            return {
                "answer": "⏳ The AI is temporarily rate-limited. Please wait a few seconds and try again.",
                "confidence": 0.0,
                "used_chunks": [],
            }
        error_msg = e.read().decode('utf-8')
        raise Exception(f"Groq API Error {e.code}: {error_msg}")
    except Exception as e:
        raise

    if not answer_text:
         answer_text = "I could not find this information in the provided SISTec documents."

    avg_score = sum(c.get("score", 0) for c in relevant_chunks) / len(relevant_chunks)
    confidence = round(min(avg_score * 100, 100), 1)

    return {
        "answer": answer_text,
        "confidence": confidence,
        "used_chunks": relevant_chunks,
    }
