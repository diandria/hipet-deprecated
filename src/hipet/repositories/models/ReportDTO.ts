import { Post } from '../../entities'

export class ReportDTO {
  _id: string
  createdAt: Date
  post: Post
  reason: string
}
