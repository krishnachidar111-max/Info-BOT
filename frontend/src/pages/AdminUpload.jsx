import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Upload, FileText, Trash2, CheckCircle, AlertCircle, RefreshCw,
  Database, Clock, Layers,
} from 'lucide-react'
import UploadBox from '../components/UploadBox'
import { getDocuments, deleteDocument } from '../api/api'

function StatusBadge({ status }) {
  const map = {
    ready: { cls: 'confidence-high', label: '✓ Ready' },
    processing: { cls: 'confidence-medium', label: '⟳ Processing' },
    error: { cls: 'confidence-low', label: '✕ Error' },
  }
  const { cls, label } = map[status] || map.error
  return <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${cls}`}>{label}</span>
}

export default function AdminUpload() {
  const [documents, setDocuments] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const fetchDocuments = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getDocuments()
      setDocuments(res.data)
    } catch {
      setDocuments([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchDocuments() }, [fetchDocuments])

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"? This will remove all its vectors from FAISS.`)) return
    setDeleting(id)
    try {
      await deleteDocument(id)
      setDocuments((prev) => prev.filter((d) => d.id !== id))
    } catch {
      alert('Failed to delete document.')
    } finally {
      setDeleting(null)
    }
  }

  const totalChunks = documents.filter(d => d.status === 'ready').reduce((a, d) => a + d.chunk_count, 0)
  const totalPages = documents.filter(d => d.status === 'ready').reduce((a, d) => a + d.page_count, 0)

  return (
    <div className="page-container pt-24 pb-20 px-6">
      <div className="orb orb-purple w-96 h-96 -top-20 -right-20 opacity-10" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <p className="text-indigo-400 font-semibold text-sm uppercase tracking-widest mb-2">Admin Panel</p>
          <h1 className="text-4xl font-bold text-white mb-3">
            Document <span className="gradient-text">Upload</span>
          </h1>
          <p className="text-slate-400 max-w-xl">
            Upload official SISTec PDF documents to power the AI chatbot. The RAG pipeline will automatically process and index them.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[
            { icon: FileText, label: 'Documents', value: documents.length },
            { icon: Layers, label: 'Total Chunks', value: totalChunks.toLocaleString() },
            { icon: Database, label: 'Pages Indexed', value: totalPages },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="glass-card border border-white/5 p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                <Icon size={18} className="text-indigo-400" />
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text-blue">{value}</p>
                <p className="text-xs text-slate-500">{label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Upload Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="glass-card border border-white/8 p-6 mb-8"
        >
          <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
            <Upload size={18} className="text-indigo-400" />
            Upload New Document
          </h2>
          <UploadBox onUploadSuccess={fetchDocuments} />
        </motion.div>

        {/* Document List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-card border border-white/8 p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-white font-semibold text-lg flex items-center gap-2">
              <Database size={18} className="text-indigo-400" />
              Knowledge Base ({documents.length} document{documents.length !== 1 ? 's' : ''})
            </h2>
            <button
              onClick={fetchDocuments}
              className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
            >
              <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500 text-sm">Loading documents...</div>
          ) : documents.length === 0 ? (
            <div className="py-12 text-center">
              <FileText size={40} className="text-slate-700 mx-auto mb-3" />
              <p className="text-slate-500 text-sm">No documents uploaded yet.</p>
              <p className="text-slate-600 text-xs mt-1">Upload a PDF above to get started.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <AnimatePresence>
                {documents.map((doc, i) => (
                  <motion.div
                    key={doc.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, height: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-white/2 hover:border-indigo-500/20 transition-all duration-200 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-red-500/15 border border-red-500/20 flex items-center justify-center flex-shrink-0">
                      <FileText size={18} className="text-red-400" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{doc.filename}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <Layers size={10} />
                          {doc.chunk_count} chunks
                        </span>
                        <span className="text-xs text-slate-500 flex items-center gap-1">
                          <FileText size={10} />
                          {doc.page_count} pages
                        </span>
                        <span className="text-xs text-slate-600 flex items-center gap-1">
                          <Clock size={10} />
                          {new Date(doc.created_at).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <StatusBadge status={doc.status} />

                    <button
                      id={`delete-doc-${doc.id}`}
                      onClick={() => handleDelete(doc.id, doc.filename)}
                      disabled={deleting === doc.id}
                      className="w-8 h-8 rounded-lg border border-red-500/20 text-red-500/60 hover:text-red-400 hover:border-red-500/40 hover:bg-red-500/10 transition-all duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100"
                      title="Delete document"
                    >
                      {deleting === doc.id
                        ? <RefreshCw size={14} className="animate-spin" />
                        : <Trash2 size={14} />
                      }
                    </button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
