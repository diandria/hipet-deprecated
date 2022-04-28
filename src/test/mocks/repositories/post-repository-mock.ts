import { PostRepository } from '../../../hipet/repositories/interfaces'
import { PostDTO } from '../../../hipet/repositories/models'
import { mockPostDTO } from './models'

export class PostRepositoryStub implements PostRepository {
  async add (post: PostDTO): Promise<boolean> {
    return true
  }

  async findPostBy (field: string, value: any): Promise<PostDTO> {
    return mockPostDTO()
  }
}
