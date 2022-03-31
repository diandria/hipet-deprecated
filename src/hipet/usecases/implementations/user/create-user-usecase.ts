import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { CreateUserResult, CreateUserResultStatusOptions, CreateUserUseCaseInterface, UserRequest } from '../../interfaces'

type Dependencies = {
  userRepository: UserRepository
}

export class CreateUserUseCase implements CreateUserUseCaseInterface {
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

    const isEmailUsed = await this.userRepository.findUserBy('email', userDTO.email)
    const isDocumentUsed = await this.userRepository.findUserBy('document', userDTO.document)
    const isNickNameUsed = await this.userRepository.findUserBy('nickName', userDTO.nickName)
    if (isEmailUsed || isDocumentUsed || isNickNameUsed) {
      return {
        status: CreateUserResultStatusOptions.unique_key_field
      }
    }

    const createdUser = await this.userRepository.add(userDTO)
    if (!createdUser) {
      return {
        status: CreateUserResultStatusOptions.repository_error
      }
    }

    return {
      status: CreateUserResultStatusOptions.success
    }
  }
}
