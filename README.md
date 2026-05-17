# 🎓 SISTec Info Bot

**Your AI Assistant for Verified SISTec Information**

> A production-grade **RAG (Retrieval-Augmented Generation)** chatbot for Sagar Institute of Science and Technology (SISTec) Gandhi Nagar — built for hackathon excellence.

---

## 🚀 Problem Statement

Students, parents, freshers, and visitors struggle to find accurate, specific information about SISTec. Navigating through long PDFs, outdated websites, and scattered documents is time-consuming and error-prone.

**SISTec Info Bot** solves this by providing instant, document-backed answers to any college-related query.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| 📄 **Document-Only Answers** | AI answers ONLY from uploaded SISTec PDFs |
| 🔗 **Source Citations** | Every answer cites the source document and page number |
| 🚫 **Out-of-Scope Refusal** | Refuses to answer if information isn't in documents |
| 🎯 **Confidence Score** | Shows answer confidence based on retrieval similarity |
| 📤 **Admin Upload Panel** | Drag-and-drop PDF upload with processing status |
| 🗂️ **Document Management** | View and delete indexed documents |
| 💬 **Chat History** | All Q&A sessions saved to SQLite |

---

## 🛠️ Tech Stack

### Frontend
- **React 18** + **Vite** — Fast, modern UI framework
- **Tailwind CSS** — Utility-first styling
- **Framer Motion** — Smooth animations
- **React Router v6** — Client-side routing
- **Axios** — API communication
- **Lucide React** — Icon library

### Backend
- **Python FastAPI** — High-performance REST API
- **Google Gemini 1.5 Flash** — LLM for answer generation
- **FAISS (IndexFlatIP)** — Cosine similarity vector search
- **sentence-transformers (all-MiniLM-L6-v2)** — Local text embeddings
- **pypdf + pdfplumber** — PDF text extraction
- **LangChain TextSplitter** — Document chunking
- **SQLAlchemy + SQLite** — Document metadata and chat history

---

## 🧠 RAG Pipeline

```
PDF Upload → Text Extraction → Chunking → Embedding → FAISS Store
                                                              ↓
User Question → Question Embedding → FAISS Search → Top-5 Chunks
                                                              ↓
                              Gemini API (strict prompt) → Grounded Answer
                                                              ↓
                                    Answer + Source Citations + Confidence Score
```

### RAG Parameters
- **Chunk Size**: 900 characters
- **Chunk Overlap**: 150 characters  
- **Top-K Retrieval**: 5 chunks
- **Similarity Threshold**: 0.35 (cosine)
- **LLM Temperature**: 0.1 (factual mode)

---

## 📂 Project Structure

```
RAG2.0/
├── frontend/           # React + Vite app
│   ├── src/
│   │   ├── pages/      # Home, Chat, AdminUpload, Workflow, About
│   │   ├── components/ # Navbar, ChatBox, UploadBox, SourceCard, etc.
│   │   ├── api/        # Axios API client
│   │   └── styles/     # Global CSS design system
│   └── package.json
│
└── backend/            # FastAPI Python backend
    ├── main.py         # App entry point
    ├── app/
    │   ├── routes/     # upload.py, chat.py, documents.py
    │   ├── services/   # pdf_loader, chunker, embeddings, vectorstore, gemini_service
    │   ├── database/   # SQLAlchemy models (Document, ChatHistory)
    │   └── utils/      # config.py
    ├── uploads/        # Stored PDF files
    └── vectorstore/    # FAISS index files
```

---

## ⚡ Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- A Google Gemini API key ([Get one free](https://aistudio.google.com/))

### 1. Backend Setup

```powershell
cd backend

# Create virtual environment
python -m venv .venv
.venv\Scripts\activate      # Windows
# source .venv/bin/activate  # Linux/Mac

# Install dependencies
pip install -r requirements.txt

# Configure API key
copy .env.example .env
# Edit .env and add your GEMINI_API_KEY

# Start the server
uvicorn main:app --reload
```

Backend runs at: **http://localhost:8000**  
API Docs (Swagger): **http://localhost:8000/docs**

### 2. Frontend Setup

```powershell
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

Frontend runs at: **http://localhost:5173**

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/upload` | Upload and process a PDF document |
| `POST` | `/ask` | Ask a question and get a grounded answer |
| `GET` | `/documents` | List all uploaded documents |
| `DELETE` | `/documents/{id}` | Delete a document and its vectors |
| `GET` | `/history` | Get chat history |
| `GET` | `/health` | Health check + vector count |
| `GET` | `/docs` | Swagger API documentation |

---

## 🌐 Environment Variables

Create a `.env` file in `/backend/`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## 🎯 Demo Questions for Judges

After uploading a SISTec document, try these:

1. *"What B.Tech programs are offered at SISTec?"*
2. *"What is the fee structure for MBA?"*
3. *"Tell me about the AI and Data Science department."*
4. *"What hostel facilities are available for students?"*
5. *"What are the rules for students?"*
6. *"What events are organized by SISTec?"*

**Out-of-scope test**: *"What is the capital of France?"*
→ Expected: *"I could not find this information in the provided SISTec documents."*

---

## 🔮 Future Scope

- Multi-language support (Hindi + English)
- Voice input / text-to-speech output
- WhatsApp chatbot integration
- Real-time SISTec website scraping
- Student login and personalized history
- Department-specific document filtering
- Exam schedule and result integration
- Mobile app (React Native)

---

## 👨‍💻 Built With

Made with ❤️ for SISTec Gandhi Nagar — Hackathon 2025

**Stack**: React + FastAPI + FAISS + Google Gemini + sentence-transformers
