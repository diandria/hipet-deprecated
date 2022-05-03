import { PostDTO } from '../models'

export interface PostRepository {
  add(post: PostDTO): Promise<boolean>
  findPostBy(field: string, value: any): Promise<PostDTO>
  list(): Promise<PostDTO[]>
}
