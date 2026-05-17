import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Bot, MessageCircle, Upload, Shield, BookOpen, Zap, GitBranch, Star, ArrowRight,
  Database, Search, Brain, FileText, Quote,
} from 'lucide-react'
import FeatureCard from '../components/FeatureCard'

const features = [
  {
    icon: Shield,
    title: 'Document-Only Answers',
    description: 'AI answers exclusively from uploaded SISTec documents. No hallucinations, no outside knowledge.',
    color: 'blue',
  },
  {
    icon: FileText,
    title: 'Source Citations',
    description: 'Every answer comes with exact document references and page numbers for full transparency.',
    color: 'purple',
  },
  {
    icon: Shield,
    title: 'Out-of-Scope Refusal',
    description: 'If the answer isn\'t in the documents, the bot politely refuses instead of guessing.',
    color: 'indigo',
  },
  {
    icon: MessageCircle,
    title: 'Student-Friendly',
    description: 'Responses are clear, concise, and formatted for students, parents, and freshers.',
    color: 'cyan',
  },
  {
    icon: Zap,
    title: 'Instant Retrieval',
    description: 'FAISS vector search finds the most relevant document chunks in milliseconds.',
    color: 'blue',
  },
  {
    icon: Brain,
    title: 'Powered by Gemini',
    description: 'Google\'s latest Gemini 1.5 Flash model generates accurate, coherent answers.',
    color: 'purple',
  },
]

const workflowSteps = [
  { icon: Upload, step: '01', title: 'Upload PDF', desc: 'Admin uploads official SISTec documents' },
  { icon: FileText, step: '02', title: 'Extract Text', desc: 'pypdf extracts text from each page' },
  { icon: GitBranch, step: '03', title: 'Chunk Text', desc: 'Split into 900-char chunks with overlap' },
  { icon: Database, step: '04', title: 'Generate Embeddings', desc: 'sentence-transformers creates vectors' },
  { icon: Database, step: '05', title: 'Store in FAISS', desc: 'Vectors indexed for fast retrieval' },
  { icon: Search, step: '06', title: 'Semantic Search', desc: 'Cosine similarity finds top-5 chunks' },
  { icon: Brain, step: '07', title: 'Gemini API', desc: 'Grounded answer generated from context' },
  { icon: Quote, step: '08', title: 'Cited Answer', desc: 'Response with source & confidence score' },
]

export default function Home() {
  return (
    <div className="page-container">
      {/* Background Orbs */}
      <div className="orb orb-blue w-[500px] h-[500px] -top-40 -left-20" />
      <div className="orb orb-purple w-[400px] h-[400px] top-1/2 -right-40" />
      <div className="orb orb-blue w-[300px] h-[300px] bottom-40 left-1/3" />

      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 px-6 text-center max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-card border border-indigo-500/25 text-indigo-300 text-xs font-semibold mb-8"
        >
          <Star size={12} className="fill-indigo-300" />
          Hackathon-Ready RAG Project • Google Gemini + FAISS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="section-title mb-6"
        >
          <span className="text-white">SISTec</span>{' '}
          <span className="gradient-text">Info Bot</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed"
        >
          Your AI Assistant for{' '}
          <span className="text-white font-semibold">Verified SISTec Information</span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-slate-500 max-w-xl mx-auto mb-10 text-sm leading-relaxed"
        >
          Ask any question about courses, departments, admissions, rules, facilities, or events —
          and receive accurate, document-backed answers with full source citations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/chat" id="hero-ask-btn" className="btn-gradient text-base px-8 py-3.5 flex items-center gap-2">
            <span className="flex items-center gap-2">
              <MessageCircle size={18} />
              Ask a Question
              <ArrowRight size={16} />
            </span>
          </Link>
          <Link to="/admin" id="hero-upload-btn" className="btn-outline text-base px-8 py-3.5 flex items-center gap-2">
            <Upload size={18} />
            Upload Documents
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-8 mt-16"
        >
          {[
            { label: 'RAG Pipeline', value: 'FAISS + Gemini' },
            { label: 'Chunk Size', value: '900 chars' },
            { label: 'Similarity Search', value: 'Top-5 Chunks' },
            { label: 'Hallucination', value: 'Zero Tolerance' },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="gradient-text-blue font-bold text-lg">{value}</p>
              <p className="text-slate-500 text-xs mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3"
          >
            Key Capabilities
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="section-title text-white mb-4"
          >
            Built for <span className="gradient-text">Accuracy</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-xl mx-auto text-sm"
          >
            Every feature is designed to eliminate hallucinations and provide trustworthy, citation-backed answers.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <FeatureCard key={f.title} {...f} delay={i * 0.08} />
          ))}
        </div>
      </section>

      {/* ── RAG WORKFLOW ─────────────────────────────────────────────────────── */}
      <section className="px-6 py-20 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-purple-400 font-semibold text-sm uppercase tracking-widest mb-3"
            >
              How It Works
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-title text-white"
            >
              RAG <span className="gradient-text">Workflow</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {workflowSteps.map(({ icon: Icon, step, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                className="glass-card-hover p-5 text-center relative"
              >
                <div className="text-xs font-bold text-slate-600 mb-3">{step}</div>
                <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center mx-auto mb-3 shadow-glow-blue">
                  <Icon size={18} className="text-white" />
                </div>
                <h3 className="font-semibold text-white text-sm mb-1.5">{title}</h3>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────────── */}
      <section className="px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto glass-card border border-indigo-500/20 p-12 relative overflow-hidden"
        >
          <div className="orb orb-blue w-80 h-80 -top-20 -left-20 opacity-10" />
          <div className="orb orb-purple w-60 h-60 -bottom-10 -right-10 opacity-10" />
          <div className="relative z-10">
            <h2 className="section-title text-white mb-4">
              Ready to <span className="gradient-text">Explore SISTec?</span>
            </h2>
            <p className="text-slate-400 mb-8 max-w-lg mx-auto">
              Get instant, verified answers from official SISTec Gandhi Nagar documents.
            </p>
            <Link to="/chat" className="btn-gradient text-base px-10 py-4 inline-flex items-center gap-2">
              <span className="flex items-center gap-2">
                <Bot size={20} />
                Start Chatting Now
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center text-slate-600 text-sm">
        <p>SISTec Info Bot © 2025 • Built with React + FastAPI + FAISS + Google Gemini</p>
        <p className="mt-1 text-xs">Sagar Institute of Science and Technology (SISTec) Gandhi Nagar</p>
      </footer>
    </div>
  )
}
