import ProjectsSection from '../sections/ProjectsSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ProjectsPage() {
  useDocumentTitle('Projects | Akshat Soni')

  return (
    <>
      <ProjectsSection />
    </>
  )
}