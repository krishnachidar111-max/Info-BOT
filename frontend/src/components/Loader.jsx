import { motion } from 'framer-motion'

export default function Loader({ text = 'Thinking...' }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      {/* Animated dots */}
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-400 to-violet-400"
            animate={{ y: [0, -6, 0], opacity: [0.5, 1, 0.5] }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>
      <span className="text-sm text-slate-400 italic">{text}</span>
    </div>
  )
}
