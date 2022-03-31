import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { CreateUserResult, CreateUserResultStatusOptions, CreateUserUseCaseInterface, UserRequest } from '../../interfaces'

type Dependencies = {
  userRepository: UserRepository
}

export class UserUseCases implements CreateUserUseCaseInterface {
  private readonly userRepository: UserRepository

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
  }

  async saveUser (userRequest: UserRequest): Promise<CreateUserResult> {
    const userDTO = new UserDTO()

    userDTO.name = userRequest.name
    userDTO.email = userRequest.email
    userDTO.password = userRequest.password
    userDTO.phoneNumber = userRequest.phoneNumber
    userDTO.document = userRequest.document
    userDTO.nickName = userRequest.nickName

    const isUserCreated = await this.userRepository.add(userDTO)

    if (!isUserCreated) {
      return {
        status: CreateUserResultStatusOptions.repository_error
      }
    }

    return {
      status: CreateUserResultStatusOptions.success
    }
  }
}
