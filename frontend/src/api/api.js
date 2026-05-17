import axios from 'axios'

const API = axios.create({
  baseURL: 'http://127.0.0.1:8000',
  timeout: 120000, // 120s — Gemini API can be slow on free tier
})

// ── Documents ──────────────────────────────────────────────────────────────

export const uploadDocument = (formData, onProgress) =>
  API.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (e) => {
      if (onProgress) onProgress(Math.round((e.loaded * 100) / e.total))
    },
  })

export const getDocuments = () => API.get('/documents')

export const deleteDocument = (id) => API.delete(`/documents/${id}`)

// ── Chat ────────────────────────────────────────────────────────────────────

export const askQuestion = (question) =>
  API.post('/ask', { question })

export const getChatHistory = (limit = 50) =>
  API.get('/history', { params: { limit } })

// ── Health ──────────────────────────────────────────────────────────────────

export const getHealth = () => API.get('/health')
