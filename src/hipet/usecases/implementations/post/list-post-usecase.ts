import { Post } from '../../../entities'
import { PostRepository } from '../../../repositories/interfaces'
import { PostDTO } from '../../../repositories/models'
import { ListPostResult, ListPostResultStatusOptions, ListPostUseCaseInterface } from '../../interfaces'

type Dependencies = {
  postRepository: PostRepository
}

export class ListPostUseCase implements ListPostUseCaseInterface {
  private readonly postRepository: PostRepository

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
  }

  private toPost (postDto: PostDTO): Post {
    const post = new Post()
    post.animal = postDto.animal
    post.createdAt = postDto.createdAt
    post.description = postDto.description
    post.picture = postDto.picture
    post.reports = postDto.reports
    post.user = postDto.user
    return post
  }

  async list (): Promise<ListPostResult> {
    const listPosts = await this.postRepository.list()

    if (!listPosts) {
      return ({
        status: ListPostResultStatusOptions.repository_error,
        posts: null
      })
    }

    return {
      status: ListPostResultStatusOptions.success,
      posts: listPosts.map(postDto => this.toPost(postDto))
    }
  }
}
