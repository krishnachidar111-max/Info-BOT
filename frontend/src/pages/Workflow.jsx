import { motion } from 'framer-motion'
import {
  Upload, FileText, Scissors, Cpu, Database, Search, Brain, Quote, ArrowDown,
} from 'lucide-react'

const steps = [
  {
    icon: Upload,
    step: '01',
    title: 'Upload PDF Document',
    description: 'Admin uploads official SISTec PDFs (prospectus, department info, rulebooks, event docs) via the Admin Upload page.',
    tech: 'FastAPI multipart/form-data',
    color: 'blue',
    details: ['Supports up to 50MB PDFs', 'Saved to /uploads/ directory', 'Tracked in SQLite database'],
  },
  {
    icon: FileText,
    step: '02',
    title: 'Extract Text',
    description: 'Text is extracted from every page of the PDF using pypdf with pdfplumber as a fallback for complex layouts.',
    tech: 'pypdf + pdfplumber',
    color: 'purple',
    details: ['Page-by-page extraction', 'pdfplumber fallback for tables', 'Page number metadata preserved'],
  },
  {
    icon: Scissors,
    step: '03',
    title: 'Split into Chunks',
    description: 'Extracted text is split into overlapping chunks using RecursiveCharacterTextSplitter for optimal retrieval.',
    tech: 'LangChain TextSplitter',
    color: 'indigo',
    details: ['Chunk size: 900 characters', 'Overlap: 150 characters', 'Separators: paragraphs → sentences → words'],
  },
  {
    icon: Cpu,
    step: '04',
    title: 'Generate Embeddings',
    description: 'Each chunk is converted into a 384-dimensional semantic vector using sentence-transformers.',
    tech: 'all-MiniLM-L6-v2',
    color: 'cyan',
    details: ['384-dimensional dense vectors', 'Cosine-normalized for similarity', 'Runs entirely locally (no API cost)'],
  },
  {
    icon: Database,
    step: '05',
    title: 'Store in FAISS',
    description: 'Embeddings are indexed in FAISS (IndexFlatIP) for ultra-fast cosine similarity search. Index is persisted to disk.',
    tech: 'FAISS IndexFlatIP',
    color: 'blue',
    details: ['Inner Product ≡ cosine similarity (on normalized vecs)', 'Persisted as faiss.index + metadata.json', 'Sub-millisecond retrieval'],
  },
  {
    icon: Search,
    step: '06',
    title: 'Semantic Retrieval',
    description: 'The user question is embedded and compared against all stored vectors. Top-5 most similar chunks are retrieved.',
    tech: 'FAISS cosine search',
    color: 'purple',
    details: ['Top-5 chunks retrieved', 'Similarity threshold: 0.35', 'Below threshold → refusal response'],
  },
  {
    icon: Brain,
    step: '07',
    title: 'Generate Answer via Gemini',
    description: 'Retrieved chunks are injected into a strict system prompt. Gemini 1.5 Flash generates a grounded answer.',
    tech: 'Google Gemini 1.5 Flash',
    color: 'indigo',
    details: ['Strict "SISTec-only" system prompt', 'Temperature: 0.1 (factual)', 'Refuses out-of-scope questions'],
  },
  {
    icon: Quote,
    step: '08',
    title: 'Cited Answer Returned',
    description: 'The final answer is returned with source citations (filename, page number, match score) and a confidence badge.',
    tech: 'FastAPI JSON response',
    color: 'cyan',
    details: ['Answer + sources + confidence', 'Source documents cited by page', 'Saved to chat history SQLite'],
  },
]

const colorMap = {
  blue: { bg: 'bg-blue-500/15', border: 'border-blue-500/25', text: 'text-blue-400', pill: 'bg-blue-500/10 text-blue-300 border-blue-500/20' },
  purple: { bg: 'bg-purple-500/15', border: 'border-purple-500/25', text: 'text-purple-400', pill: 'bg-purple-500/10 text-purple-300 border-purple-500/20' },
  indigo: { bg: 'bg-indigo-500/15', border: 'border-indigo-500/25', text: 'text-indigo-400', pill: 'bg-indigo-500/10 text-indigo-300 border-indigo-500/20' },
  cyan: { bg: 'bg-cyan-500/15', border: 'border-cyan-500/25', text: 'text-cyan-400', pill: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20' },
}

export default function Workflow() {
  return (
    <div className="page-container pt-24 pb-20 px-6">
      <div className="orb orb-blue w-96 h-96 -top-20 -left-20 opacity-8" />
      <div className="orb orb-purple w-80 h-80 bottom-40 -right-20 opacity-8" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">
            Technical Deep Dive
          </p>
          <h1 className="section-title text-white mb-4">
            RAG <span className="gradient-text">Pipeline</span> Workflow
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A step-by-step visual explanation of how SISTec Info Bot retrieves, grounds, and generates accurate answers from uploaded documents.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map(({ icon: Icon, step, title, description, tech, color, details }, i) => {
            const c = colorMap[color]
            return (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className={`glass-card border ${c.border} p-6 relative overflow-hidden group hover:border-opacity-60 transition-all duration-300`}
              >
                <div className="flex gap-5">
                  {/* Step Number + Icon */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0">
                    <div className={`w-12 h-12 rounded-2xl ${c.bg} border ${c.border} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={22} className={c.text} />
                    </div>
                    <span className={`text-xs font-bold ${c.text} opacity-60`}>{step}</span>
                    {i < steps.length - 1 && (
                      <div className="flex-1 w-px bg-gradient-to-b from-slate-700 to-transparent min-h-[20px]" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-white text-lg">{title}</h3>
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-mono ${c.pill}`}>
                        {tech}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{description}</p>
                    <div className="flex flex-wrap gap-2">
                      {details.map((d) => (
                        <span key={d} className={`text-xs px-2.5 py-1 rounded-lg ${c.bg} ${c.text} border ${c.border}`}>
                          {d}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Summary Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 glass-card border border-indigo-500/25 p-8 text-center"
        >
          <h3 className="text-white font-bold text-xl mb-3">Why RAG Eliminates Hallucinations</h3>
          <p className="text-slate-400 text-sm leading-relaxed max-w-2xl mx-auto">
            Traditional LLMs generate answers from training data, which can be outdated or incorrect.
            RAG (Retrieval-Augmented Generation) <span className="text-indigo-300 font-semibold">grounds every answer in your documents</span>.
            Gemini sees only the retrieved context — if the answer isn't there, it says so.
            This makes SISTec Info Bot <span className="text-green-400 font-semibold">100% verifiable</span> by judges live.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
