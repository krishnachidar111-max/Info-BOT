import { motion } from 'framer-motion'
import { FileText, ExternalLink } from 'lucide-react'

export default function SourceCard({ source, index }) {
  const scorePercent = Math.round((source.score || 0) * 100)
  const scoreColor =
    scorePercent >= 70 ? 'confidence-high' : scorePercent >= 45 ? 'confidence-medium' : 'confidence-low'

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="glass-card border border-indigo-500/15 p-4 hover:border-indigo-500/30 transition-all duration-200"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center flex-shrink-0">
            <FileText size={14} className="text-indigo-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-indigo-300 truncate">{source.filename || 'Unknown Document'}</p>
            {source.page_num && (
              <p className="text-xs text-slate-500">Page {source.page_num}</p>
            )}
          </div>
        </div>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${scoreColor}`}>
          {scorePercent}% match
        </span>
      </div>

      <p className="text-xs text-slate-400 leading-relaxed line-clamp-3">
        {source.text}
      </p>
    </motion.div>
  )
}
