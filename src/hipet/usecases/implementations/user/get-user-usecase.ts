import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { GetUserResult, GetUserResultStatusOptions, GetUserUseCaseInterface, UserRequest } from '../../interfaces'
import { User } from '../../../entities'

type Dependencies = {
  userRepository: UserRepository
}

export class GetUserUseCase implements GetUserUseCaseInterface {
  private readonly userRepository: UserRepository

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
  }

  private toUser (dto: UserDTO): User {
    const user = new User()
    user.email = dto.email
    user.name = dto.name
    user.password = dto.password
    user.phoneNumber = dto.phoneNumber
    user.nickName = dto.nickName
    user.document = dto.document
    return user
  }

  async get (userRequest: UserRequest): Promise<GetUserResult> {
    const userDTO = await this.userRepository.findUserBy('email', userRequest.email)

    if (!userDTO) {
      return {
        status: GetUserResultStatusOptions.user_not_exists,
        user: null
      }
    }

    return {
      status: GetUserResultStatusOptions.success,
      user: this.toUser(userDTO)
    }
  }
}
