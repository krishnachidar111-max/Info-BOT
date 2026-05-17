import { useCallback, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, File, CheckCircle, AlertCircle, X, Loader2 } from 'lucide-react'
import { uploadDocument } from '../api/api'

export default function UploadBox({ onUploadSuccess }) {
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState(null) // { type: 'success'|'error', message }
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFile = useCallback(async (file) => {
    if (!file) return
    if (!file.name.toLowerCase().endsWith('.pdf')) {
      setStatus({ type: 'error', message: 'Only PDF files are supported.' })
      return
    }

    setSelectedFile(file)
    setStatus(null)
    setProgress(0)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', file)
      const res = await uploadDocument(formData, setProgress)
      setStatus({ type: 'success', message: res.data.message })
      onUploadSuccess?.()
    } catch (err) {
      const msg = err.response?.data?.detail || 'Upload failed. Please try again.'
      setStatus({ type: 'error', message: msg })
    } finally {
      setUploading(false)
      setProgress(0)
    }
  }, [onUploadSuccess])

  const handleDrop = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }, [handleFile])

  const handleInputChange = (e) => {
    handleFile(e.target.files[0])
    e.target.value = ''
  }

  return (
    <div className="space-y-4">
      {/* Drop Zone */}
      <motion.label
        htmlFor="pdf-upload"
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        animate={{
          borderColor: isDragging ? 'rgba(99,102,241,0.8)' : 'rgba(255,255,255,0.1)',
          backgroundColor: isDragging ? 'rgba(99,102,241,0.08)' : 'rgba(255,255,255,0.02)',
        }}
        className="block border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 group"
      >
        <input
          id="pdf-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleInputChange}
          disabled={uploading}
        />
        <div className="flex flex-col items-center gap-4">
          <motion.div
            animate={{ scale: isDragging ? 1.1 : 1 }}
            className="w-16 h-16 rounded-2xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center group-hover:bg-indigo-500/25 transition-colors duration-200"
          >
            <Upload size={28} className="text-indigo-400" />
          </motion.div>
          <div>
            <p className="text-white font-semibold text-lg mb-1">
              {isDragging ? 'Drop it here!' : 'Drop PDF here or click to browse'}
            </p>
            <p className="text-slate-500 text-sm">Supports PDF files up to 50MB</p>
          </div>
          {!uploading && (
            <span className="btn-gradient text-sm">
              <span>Choose File</span>
            </span>
          )}
        </div>
      </motion.label>

      {/* Selected File Info */}
      {selectedFile && (
        <div className="glass-card border border-indigo-500/20 px-4 py-3 flex items-center gap-3">
          <File size={18} className="text-indigo-400 flex-shrink-0" />
          <span className="text-sm text-slate-300 flex-1 truncate">{selectedFile.name}</span>
          <span className="text-xs text-slate-500">{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</span>
        </div>
      )}

      {/* Progress Bar */}
      <AnimatePresence>
        {uploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400 flex items-center gap-2">
                <Loader2 size={14} className="animate-spin text-indigo-400" />
                Processing document...
              </span>
              <span className="text-indigo-400 font-semibold">{progress}%</span>
            </div>
            <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-brand rounded-full"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Status Message */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`flex items-start gap-3 p-4 rounded-xl border ${
              status.type === 'success'
                ? 'bg-green-500/10 border-green-500/25 text-green-300'
                : 'bg-red-500/10 border-red-500/25 text-red-300'
            }`}
          >
            {status.type === 'success' ? (
              <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            )}
            <p className="text-sm flex-1">{status.message}</p>
            <button onClick={() => setStatus(null)} className="opacity-60 hover:opacity-100 transition-opacity">
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
