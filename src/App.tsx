import { useEffect, Suspense, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import FooterSection from './sections/FooterSection'
import ScrollToTop from './components/ScrollToTop'
import { lazyWithRetry } from './utils/lazyWithRetry'

const HomePage = lazyWithRetry(() => import('./pages/Home'))
const ProjectsPage = lazyWithRetry(() => import('./pages/Projects'))
const ResumePage = lazyWithRetry(() => import('./pages/Resume'))
const ContactPage = lazyWithRetry(() => import('./pages/Contact'))

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Clear chunk-load retry flag once the page mounts successfully
    try {
      sessionStorage.removeItem('chunk-load-retry-failed')
    } catch (e) {
      console.warn('sessionStorage is not accessible:', e)
    }
  }, [])

  return (
    <>
      <CustomCursor />
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <BrowserRouter>
          <ScrollToTop />
          <Navbar />
          <main>
            <Suspense fallback={<div className="min-h-screen bg-bg" />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/resume" element={<ResumePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </main>
          <FooterSection />
        </BrowserRouter>
      )}
    </>
  )
}
