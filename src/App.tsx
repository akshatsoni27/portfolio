import { lazy, Suspense, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import CustomCursor from './components/CustomCursor'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import FooterSection from './sections/FooterSection'

const HomePage = lazy(() => import('./pages/Home'))
const ProjectsPage = lazy(() => import('./pages/Projects'))
const ResumePage = lazy(() => import('./pages/Resume'))
const ContactPage = lazy(() => import('./pages/Contact'))

export default function App() {
  const [isLoading, setIsLoading] = useState(true)

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
