import ResumeSection from '../sections/ResumeSection'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function ResumePage() {
  useDocumentTitle('Resume | Akshat Soni')

  return <ResumeSection />
}