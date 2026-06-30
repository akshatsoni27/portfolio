import SkillsSection from '../sections/SkillsSection'
import ExperienceSection from '../sections/ExperienceSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ResumePage() {
  useDocumentTitle('Resume | Rajat Maheshwari')

  return (
    <>
      <SkillsSection />
      <ExperienceSection />
    </>
  )
}