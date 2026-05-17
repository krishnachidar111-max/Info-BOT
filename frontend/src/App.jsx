import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Chat from './pages/Chat'
import AdminUpload from './pages/AdminUpload'
import Workflow from './pages/Workflow'
import About from './pages/About'

const pageVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

function AnimatedPage({ children }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default function App() {
  const location = useLocation()

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/chat" element={<AnimatedPage><Chat /></AnimatedPage>} />
          <Route path="/admin" element={<AnimatedPage><AdminUpload /></AnimatedPage>} />
          <Route path="/workflow" element={<AnimatedPage><Workflow /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><About /></AnimatedPage>} />
        </Routes>
      </AnimatePresence>
    </>
  )
}
