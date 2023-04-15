import { PostRepository } from '../../../repositories/interfaces'
import { DeletePostResult, DeletePostResultStatusOptions, DeletePostUseCaseInterface, DeletePostRequest } from '../../interfaces'

type Dependencies = {
  postRepository: PostRepository
}

export class DeletePostUseCase implements DeletePostUseCaseInterface {
  private readonly postRepository: PostRepository

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
  }

  async delete (postRequest: DeletePostRequest): Promise<DeletePostResult> {
    const post = await this.postRepository.findPostBy('_id', postRequest.id)
    if (!post) {
      return {
        status: DeletePostResultStatusOptions.post_not_found
      }
    }

    const deletedPost = await this.postRepository.delete(postRequest.id)
    if (!deletedPost) {
      return {
        status: DeletePostResultStatusOptions.repository_error
      }
    }

    return {
      status: DeletePostResultStatusOptions.success
    }
  }
}
