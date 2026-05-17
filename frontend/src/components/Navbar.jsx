import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Bot, MessageCircle, Upload, GitBranch, Info, Menu, X } from 'lucide-react'
import { useState } from 'react'

const navLinks = [
  { to: '/', label: 'Home', icon: null },
  { to: '/chat', label: 'Chat', icon: MessageCircle },
  { to: '/admin', label: 'Upload Docs', icon: Upload },
  { to: '/workflow', label: 'RAG Workflow', icon: GitBranch },
  { to: '/about', label: 'About', icon: Info },
]

export default function Navbar() {
  const location = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="glass-card border-b border-white/5 rounded-none px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-brand flex items-center justify-center shadow-glow-blue group-hover:shadow-glow-purple transition-shadow duration-300">
              <Bot size={20} className="text-white" />
            </div>
            <div>
              <span className="font-bold text-lg gradient-text-blue">SISTec</span>
              <span className="font-bold text-lg text-white"> Info Bot</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to
              return (
                <li key={to}>
                  <Link
                    to={to}
                    className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {Icon && <Icon size={15} />}
                    {label}
                  </Link>
                </li>
              )
            })}
          </ul>

          {/* CTA */}
          <Link
            to="/chat"
            className="hidden md:flex btn-gradient text-sm"
          >
            <span>Ask a Question</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-slate-400 hover:text-white"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mt-4 pb-2 border-t border-white/5 pt-4 flex flex-col gap-1"
          >
            {navLinks.map(({ to, label, icon: Icon }) => {
              const isActive = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-500/20 text-indigo-300'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {Icon && <Icon size={16} />}
                  {label}
                </Link>
              )
            })}
            <Link
              to="/chat"
              onClick={() => setMobileOpen(false)}
              className="btn-gradient text-sm text-center mt-2"
            >
              <span>Ask a Question</span>
            </Link>
          </motion.div>
        )}
      </nav>
    </header>
  )
}
