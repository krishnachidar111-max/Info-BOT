import { motion } from 'framer-motion'
import { Bot, Sparkles } from 'lucide-react'
import ChatBox from '../components/ChatBox'

export default function Chat() {
  return (
    <div className="page-container flex flex-col" style={{ height: '100vh' }}>
      {/* Background */}
      <div className="orb orb-blue w-96 h-96 -top-20 -left-20 opacity-10" />
      <div className="orb orb-purple w-80 h-80 bottom-20 -right-20 opacity-10" />

      {/* Header */}
      <div className="flex-shrink-0 pt-24 pb-4 px-6 border-b border-white/5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-brand shadow-glow-blue flex items-center justify-center">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg">SISTec Info Bot</h1>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-slow" />
                <span className="text-xs text-slate-500">Powered by Gemini 1.5 Flash + FAISS</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-indigo-400 glass-card border border-indigo-500/20 px-3 py-1.5 rounded-full">
            <Sparkles size={12} />
            RAG-Grounded
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-hidden max-w-4xl w-full mx-auto relative">
        <ChatBox />
      </div>
    </div>
  )
}
