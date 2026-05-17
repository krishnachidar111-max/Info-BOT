import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Target, Users, Shield, Eye, Rocket, GraduationCap, MessageCircle,
  CheckCircle, ArrowRight, Lightbulb,
} from 'lucide-react'

const problems = [
  'Students waste time searching through long PDFs for simple answers',
  'Parents have no easy way to get accurate admission information',
  'Freshers don\'t know where to find rules, facilities, or course details',
  'College websites can be hard to navigate for newcomers',
]

const whyRag = [
  { title: 'No Hallucination', desc: 'Answers only from uploaded documents. Gemini cannot invent information.', icon: Shield },
  { title: 'Live Verifiable', desc: 'Judges can verify any answer by checking the cited source document directly.', icon: Eye },
  { title: 'Always Up-to-Date', desc: 'Upload new docs and the AI immediately knows the latest information.', icon: Rocket },
  { title: 'Transparent', desc: 'Every answer shows which document and page number it came from.', icon: CheckCircle },
]

const futureScope = [
  'Multi-language support (Hindi + English)',
  'Voice input / text-to-speech output',
  'WhatsApp chatbot integration',
  'Real-time SISTec website scraping',
  'Student login to track their queries',
  'Department-specific filtered search',
  'Exam schedule and result integration',
  'Mobile app (React Native)',
]

export default function About() {
  return (
    <div className="page-container pt-24 pb-20 px-6">
      <div className="orb orb-blue w-96 h-96 -top-20 -right-20 opacity-10" />
      <div className="orb orb-purple w-80 h-80 bottom-40 -left-20 opacity-10" />

      <div className="max-w-4xl mx-auto space-y-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-3">About the Project</p>
          <h1 className="section-title text-white mb-4">
            SISTec <span className="gradient-text">Info Bot</span>
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto">
            A production-grade RAG-based AI assistant built for Sagar Institute of Science and Technology (SISTec) Gandhi Nagar.
          </p>
        </motion.div>

        {/* Problem Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border border-red-500/15 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-red-500/15 flex items-center justify-center">
              <Target size={20} className="text-red-400" />
            </div>
            <h2 className="text-white font-bold text-xl">Problem Statement</h2>
          </div>
          <p className="text-slate-400 mb-5 leading-relaxed">
            Students, parents, and freshers visiting SISTec Gandhi Nagar often struggle to find specific information about the college.
          </p>
          <ul className="space-y-3">
            {problems.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-3 text-slate-400 text-sm"
              >
                <span className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center flex-shrink-0 mt-0.5 text-red-400 text-xs">✕</span>
                {p}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Solution */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card border border-green-500/15 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-green-500/15 flex items-center justify-center">
              <Lightbulb size={20} className="text-green-400" />
            </div>
            <h2 className="text-white font-bold text-xl">Our Solution</h2>
          </div>
          <p className="text-slate-400 leading-relaxed">
            SISTec Info Bot is a <span className="text-white font-semibold">RAG (Retrieval-Augmented Generation)</span> powered AI chatbot
            that allows anyone to ask questions about SISTec in plain English and receive instant, accurate answers —
            backed by citations from official college documents.
          </p>
          <div className="mt-5 p-4 rounded-xl bg-green-500/5 border border-green-500/15">
            <p className="text-green-300 text-sm font-medium">
              "Ask anything about SISTec and get a verified answer in seconds, with source citations from official documents."
            </p>
          </div>
        </motion.div>

        {/* Why RAG */}
        <div>
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-white font-bold text-2xl mb-8 text-center"
          >
            Why <span className="gradient-text">RAG Reduces Hallucination</span>
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {whyRag.map(({ title, desc, icon: Icon }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card border border-indigo-500/15 p-5 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">{title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How Judges Can Verify */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card glow-border p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-blue">
              <GraduationCap size={20} className="text-white" />
            </div>
            <h2 className="text-white font-bold text-xl">Live Judge Verification</h2>
          </div>
          <p className="text-slate-400 mb-5 leading-relaxed">
            Judges can verify the AI's answers in real time during the demo:
          </p>
          <ol className="space-y-3">
            {[
              'Upload any SISTec document (e.g., department brochure, admission guide)',
              'Ask a specific question (e.g., "What are the B.Tech CSE seat intake?")',
              'The AI answers AND shows the exact source chunk with page number',
              'Judge can open the original PDF and verify the answer matches',
              'Ask an out-of-scope question → AI refuses without guessing',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3 text-slate-400 text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center flex-shrink-0 text-indigo-400 text-xs font-bold">
                  {i + 1}
                </span>
                {step}
              </li>
            ))}
          </ol>
        </motion.div>

        {/* Future Scope */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-white font-bold text-2xl mb-8 text-center">
            Future <span className="gradient-text">Scope</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {futureScope.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="flex items-center gap-3 p-3.5 rounded-xl bg-white/3 border border-white/5 hover:border-indigo-500/25 transition-all duration-200"
              >
                <Rocket size={14} className="text-indigo-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link to="/chat" className="btn-gradient text-base px-10 py-4 inline-flex items-center gap-2">
            <span className="flex items-center gap-2">
              <MessageCircle size={18} />
              Try the Chatbot
              <ArrowRight size={16} />
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
