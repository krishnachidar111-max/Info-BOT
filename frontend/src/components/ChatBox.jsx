import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Bot, User, ChevronDown } from 'lucide-react'
import Loader from './Loader'
import SourceCard from './SourceCard'
import { askQuestion } from '../api/api'

const SUGGESTED_QUESTIONS = [
  'What courses are available in SISTec?',
  'Tell me about the AI & DS department.',
  'What facilities are available for students?',
  'What events are conducted in the college?',
  'What are the rules for students?',
  'What admission information is available?',
]

function ConfidenceBadge({ score }) {
  const label = score >= 70 ? 'High' : score >= 45 ? 'Medium' : 'Low'
  const cls = score >= 70 ? 'confidence-high' : score >= 45 ? 'confidence-medium' : 'confidence-low'
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cls}`}>
      {label} Confidence • {score}%
    </span>
  )
}

export default function ChatBox() {
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Hello! I\'m **SISTec Info Bot** 🎓. I can answer questions about courses, departments, admissions, facilities, events, and more — but only from verified SISTec documents. How can I help you today?',
      sources: [],
      confidence: null,
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showSuggested, setShowSuggested] = useState(true)
  const [expandedSources, setExpandedSources] = useState({})
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendMessage = async (text) => {
    const q = (text || input).trim()
    if (!q || loading) return

    setInput('')
    setShowSuggested(false)
    setMessages((prev) => [...prev, { role: 'user', content: q }])
    setLoading(true)

    try {
      const res = await askQuestion(q)
      const { answer, sources, confidence } = res.data
      setMessages((prev) => [
        ...prev,
        { role: 'bot', content: answer, sources: sources || [], confidence },
      ])
    } catch (err) {
      const detail = err?.response?.data?.detail || err?.message || 'Backend connection failed.'
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: `⚠️ ${detail}`,
          sources: [],
          confidence: null,
        },
      ])
    } finally {
      setLoading(false)
      inputRef.current?.focus()
    }
  }

  const toggleSources = (idx) =>
    setExpandedSources((prev) => ({ ...prev, [idx]: !prev[idx] }))

  const renderContent = (text) => {
    // Basic markdown: **bold**, bullet points, newlines
    return text
      .split('\n')
      .map((line, i) => {
        const bold = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        if (line.startsWith('• ') || line.startsWith('- ')) {
          return <li key={i} className="ml-4 list-disc" dangerouslySetInnerHTML={{ __html: bold.replace(/^[•\-] /, '') }} />
        }
        if (line.match(/^\d+\./)) {
          return <li key={i} className="ml-4 list-decimal" dangerouslySetInnerHTML={{ __html: bold }} />
        }
        if (!line.trim()) return <br key={i} />
        return <p key={i} dangerouslySetInnerHTML={{ __html: bold }} />
      })
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'bot' && (
                <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-glow-blue mt-1">
                  <Bot size={16} className="text-white" />
                </div>
              )}

              <div className={`max-w-[78%] space-y-3 ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col`}>
                <div
                  className={
                    msg.role === 'user'
                      ? 'bg-gradient-brand px-4 py-3 rounded-2xl rounded-tr-sm text-white text-sm leading-relaxed'
                      : 'glass-card border border-white/8 px-4 py-3 rounded-2xl rounded-tl-sm text-slate-200 text-sm leading-relaxed space-y-1'
                  }
                >
                  {renderContent(msg.content)}
                </div>

                {/* Confidence Badge */}
                {msg.role === 'bot' && msg.confidence !== null && msg.confidence !== undefined && (
                  <ConfidenceBadge score={msg.confidence} />
                )}

                {/* Sources Toggle */}
                {msg.role === 'bot' && msg.sources?.length > 0 && (
                  <div className="w-full">
                    <button
                      onClick={() => toggleSources(idx)}
                      className="flex items-center gap-1.5 text-xs text-indigo-400 hover:text-indigo-300 transition-colors font-medium"
                    >
                      <span>{expandedSources[idx] ? 'Hide' : 'Show'} {msg.sources.length} source{msg.sources.length !== 1 ? 's' : ''}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${expandedSources[idx] ? 'rotate-180' : ''}`}
                      />
                    </button>

                    <AnimatePresence>
                      {expandedSources[idx] && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-2 space-y-2 overflow-hidden"
                        >
                          {msg.sources.map((src, si) => (
                            <SourceCard key={si} source={src} index={si} />
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-xl bg-slate-700 border border-slate-600 flex items-center justify-center flex-shrink-0 mt-1">
                  <User size={16} className="text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading */}
        {loading && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex gap-3 justify-start"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0 shadow-glow-blue">
              <Bot size={16} className="text-white" />
            </div>
            <div className="glass-card border border-white/8 rounded-2xl rounded-tl-sm">
              <Loader text="Searching SISTec documents..." />
            </div>
          </motion.div>
        )}

        {/* Suggested Questions */}
        {showSuggested && messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-3"
          >
            <p className="text-xs text-slate-500 text-center font-medium">Try asking:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full glass-card border border-indigo-500/20 text-indigo-300 hover:border-indigo-500/50 hover:text-indigo-200 transition-all duration-200 hover:bg-indigo-500/10"
                >
                  {q}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-white/5 p-4">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              id="chat-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  sendMessage()
                }
              }}
              placeholder="Ask a question about SISTec..."
              rows={1}
              style={{ resize: 'none', minHeight: '44px', maxHeight: '120px' }}
              className="input-dark pr-4 py-3 overflow-y-auto"
              disabled={loading}
            />
          </div>
          <button
            id="send-button"
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="w-11 h-11 rounded-xl bg-gradient-brand flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:shadow-glow-brand disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105"
          >
            <Send size={18} className="text-white" />
          </button>
        </div>
        <p className="text-xs text-slate-600 mt-2 text-center">
          Answers are grounded exclusively in uploaded SISTec documents.
        </p>
      </div>
    </div>
  )
}
