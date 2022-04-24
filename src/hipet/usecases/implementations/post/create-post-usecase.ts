import { PostDTO } from '../../../repositories/models'
import { PostRepository } from '../../../repositories/interfaces'
import { CreatePostResult, CreatePostResultStatusOptions, CreatePostUseCaseInterface, CreatePostRequest } from '../../interfaces'

type Dependencies = {
  postRepository: PostRepository
}

export class CreatePostUseCase implements CreatePostUseCaseInterface {
  private readonly postRepository: PostRepository

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
  }

  async create (postRequest: CreatePostRequest): Promise<CreatePostResult> {
    const postDTO = new PostDTO()

    postDTO.title = postRequest.title
    postDTO.text = postRequest.text
    postDTO.userNickname = postRequest.userNickname

    const createdPost = await this.postRepository.add(postDTO)
    if (!createdPost) {
      return {
        status: CreatePostResultStatusOptions.repository_error
      }
    }

    return {
      status: CreatePostResultStatusOptions.success
    }
  }
}
