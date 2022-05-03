import { PostDTO, UserDTO } from '../../../repositories/models'
import { PostRepository, UserRepository } from '../../../repositories/interfaces'
import { CreatePostResult, CreatePostResultStatusOptions, CreatePostUseCaseInterface, CreatePostRequest } from '../../interfaces'
import { User } from '../../../entities'

type Dependencies = {
  userRepository: UserRepository
  postRepository: PostRepository
}

export class CreatePostUseCase implements CreatePostUseCaseInterface {
  private readonly postRepository: PostRepository
  private readonly userRepository: UserRepository

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
    this.userRepository = dependencies.userRepository
  }

  private toUser (userDto: UserDTO): User {
    const user = new User()
    user.document = userDto.document
    user.name = userDto.name
    user.email = userDto.email
    user.password = userDto.password
    user.phoneNumber = userDto.phoneNumber
    user.nickName = userDto.nickName
    return user
  }

  async create (postRequest: CreatePostRequest): Promise<CreatePostResult> {
    const postDTO = new PostDTO()

    const user = await this.userRepository.findUserBy('email', postRequest.userEmail)

    if (!user) {
      return {
        status: CreatePostResultStatusOptions.user_not_found
      }
    }

    postDTO.user = this.toUser(user)
    postDTO.createdAt = new Date()
    postDTO.picture = postRequest.picture
    postDTO.description = postRequest.description
    postDTO.animal = postRequest.animal
    // todo: adicionar o reports

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
