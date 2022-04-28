import { Report } from '../../../hipet/entities'
import { mockPost } from './post-mock'

export const mockReport = (): Report => {
  const report = new Report()
  report.post = mockPost()
  report.reason = 'any_reason'
  return report
}
