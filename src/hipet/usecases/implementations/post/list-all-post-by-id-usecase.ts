import { PostDTO } from '../../../repositories/models'
import { PostRepository } from '../../../repositories/interfaces'
import { ListAllPostResult, ListAllPostResultStatusOptions, ListAllPostUseCaseInterface, ListAllPostRequest, FindPostByIdUseCaseInterface } from '../../interfaces'
import { Post } from '../../../schemata/entities'

type Dependencies = {
  postRepository: PostRepository
  findPostByIdUseCase: FindPostByIdUseCaseInterface
}

export class ListAllPostUseCase implements ListAllPostUseCaseInterface {
  private readonly postRepository: PostRepository
  private readonly findPostByIdUseCase: FindPostByIdUseCaseInterface

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
    this.findPostByIdUseCase = dependencies.findPostByIdUseCase
  }

  private async to_post (postDTO: PostDTO): Promise<Post> {
    const postId = postDTO._id
    const result = await this.findPostByIdUseCase.find({ id: postId })
    return result.post
  }

  async list (reportRequest: ListAllPostRequest): Promise<ListAllPostResult> {
    const posts = await this.postRepository.listAll(reportRequest.limit)
    const listAdaptedPost = posts.map(async postDTO => await this.to_post(postDTO))

    return {
      status: ListAllPostResultStatusOptions.success,
      posts: listAdaptedPost
    }
  }
}
