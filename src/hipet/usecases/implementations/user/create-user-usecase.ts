import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { CreateUserResult, CreateUserResultStatusOptions, CreateUserUseCaseInterface, UserRequest } from '../../interfaces'
import { CryptographService } from '../../../services/interfaces'

type Dependencies = {
  userRepository: UserRepository
  crytographService: CryptographService
}

export class CreateUserUseCase implements CreateUserUseCaseInterface {
  private readonly userRepository: UserRepository
  private readonly crytographService: CryptographService

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
    this.crytographService = dependencies.crytographService
  }

  async saveUser (userRequest: UserRequest): Promise<CreateUserResult> {
    const userDTO = new UserDTO()

    userDTO.name = userRequest.name
    userDTO.email = userRequest.email
    userDTO.password = this.crytographService.encrypt(userRequest.password)
    userDTO.phoneNumber = userRequest.phoneNumber
    userDTO.document = this.crytographService.encrypt(userRequest.document)
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
