import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle('Home | Rajat Maheshwari')

  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  )
}