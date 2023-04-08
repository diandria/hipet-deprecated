import { PostDTO } from '../models'

export interface PostRepository {
  add(report: PostDTO): Promise<PostDTO>
  findPostBy(field: string, value: any): Promise<PostDTO>
  delete(reportId: string): Promise<boolean>
  listBy(field: string, value: string, limit?: number): Promise<PostDTO[]>
  listAll(limit?: number): Promise<PostDTO[]>
}
