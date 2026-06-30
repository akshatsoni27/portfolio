import ProjectsSection from '../sections/ProjectsSection'
import StatsSection from '../sections/StatsSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ProjectsPage() {
  useDocumentTitle('Projects | Rajat Maheshwari')

  return (
    <>
      <ProjectsSection />
      <StatsSection />
    </>
  )
}