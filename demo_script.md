# 🎤 SISTec Info Bot — Hackathon Demo Script

## Presentation Flow (5–7 minutes)

---

### ⏱️ Minute 1 — Introduction (Hook the Judges)

> "Good morning everyone! I'm presenting **SISTec Info Bot** — an AI assistant that answers any question about SISTec Gandhi Nagar, but only from verified, official college documents. No hallucinations, no guesswork — just accurate, cited answers."

**Key Points to Say:**
- This is a **RAG (Retrieval-Augmented Generation)** system
- It uses **Google Gemini AI** + **FAISS vector search**
- Judges can **verify every answer live** from the source document

---

### ⏱️ Minute 2 — Problem + Solution

> "Students, parents, and freshers waste time navigating long PDFs to find simple answers like admission criteria, course details, or hostel rules. Our bot gives them instant answers."

**Show:** Navigate to the **About** page and point to the Problem Statement section.

---

### ⏱️ Minute 3 — Upload Documents (Live Demo)

1. Navigate to **Admin Upload** page
2. Upload a SISTec PDF (have one ready: department brochure, admission guide, etc.)
3. Show the processing animation
4. Point out the stats: chunks indexed, pages processed

> "The backend automatically extracted text, split it into chunks, generated embeddings using sentence-transformers, and stored them in FAISS. Ready in seconds."

---

### ⏱️ Minute 4 — Live Q&A Demo (Most Important!)

Navigate to the **Chat** page and ask these questions:

**Q1:** "What courses are available in SISTec?"
→ *Show the answer with source citations*

**Q2:** "What facilities are available for students?"
→ *Click "Show sources" to reveal the document citation + page number*

**Q3:** "What are the admission requirements for B.Tech?"
→ *Show the confidence score badge*

**The killer demo — out-of-scope refusal:**
**Q4:** "Who is the Prime Minister of India?"
→ Expected: *"I could not find this information in the provided SISTec documents."*

> "This is what separates our system from a regular chatbot. It ONLY answers from the uploaded documents. Completely hallucination-free."

---

### ⏱️ Minute 5 — Technical Architecture

Navigate to the **RAG Workflow** page.

> "Here's our complete 8-step pipeline: Upload → Extract → Chunk → Embed → FAISS Store → Semantic Search → Gemini Answer → Citation. Every step is production-grade."

**Highlight:**
- Embeddings run locally (no cost, private)
- FAISS enables sub-millisecond retrieval
- Gemini temperature = 0.1 for maximum factual accuracy

---

### ⏱️ Minute 6 — Judge Verification Challenge

> "I invite any judge to open the PDF I uploaded and verify any answer the bot gave. The answer should match the source chunk exactly, at the page number shown."

This is your strongest differentiator — **verifiable AI**.

---

### ⏱️ Minute 7 — Future Scope + Closing

> "In the future, we plan to add Hindi language support, WhatsApp integration, and real-time SISTec website scraping. This can become the official AI assistant for SISTec Gandhi Nagar."

**Closing Line:**
> "SISTec Info Bot makes college information instantly accessible, completely transparent, and 100% trustworthy. Thank you!"

---

## 🔑 Key Phrases to Remember

- "RAG eliminates hallucinations by grounding answers in real documents"
- "Every answer is verifiable — judges can check the source PDF live"
- "We use FAISS for millisecond-speed semantic search"
- "Gemini AI is constrained to only use our context — it cannot invent answers"
- "The confidence score shows how relevant the retrieval was"

---

## ⚠️ Pre-Demo Checklist

- [ ] Backend running at `http://localhost:8000`
- [ ] Frontend running at `http://localhost:5173`
- [ ] `.env` has valid `GEMINI_API_KEY`
- [ ] At least 1 SISTec PDF ready to upload
- [ ] Browser tabs open: Home → Admin → Chat → Workflow
- [ ] Test Q&A done successfully before presentation
