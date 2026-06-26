import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function HomePage() {
  useDocumentTitle('Home | Akshat Soni')

  return (
    <>
      <HeroSection />
      <AboutSection />
    </>
  )
}