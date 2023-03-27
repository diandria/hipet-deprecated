import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { CreateUserResult, CreateUserResultStatusOptions, CreateUserUseCaseInterface, UserRequest } from '../../interfaces/user'
import { CryptographService } from '../../../services/interfaces'
import { User } from '../../../schemata/entities'

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

  private to_user (userDTO: UserDTO): User {
    const user = new User()
    user.id = userDTO._id
    user.type = userDTO.type
    user.name = userDTO.name
    user.email = userDTO.email
    user.nickname = userDTO.nickname
    user.phone_number = userDTO.phone_number
    user.password = this.crytographService.decrypt(userDTO.password)
    user.created_at = userDTO.created_at
    if (userDTO.document) user.document = this.crytographService.decrypt(userDTO.document)
    if (userDTO.donation_link) user.donation_link = userDTO.donation_link

    return user
  }

  async create (userRequest: UserRequest): Promise<CreateUserResult> {
    const userDTO = new UserDTO()

    userDTO.type = userRequest.type
    userDTO.name = userRequest.name
    userDTO.email = userRequest.email
    userDTO.nickname = userRequest.nickname
    userDTO.phone_number = userRequest.phone_number
    userDTO.password = this.crytographService.encrypt(userRequest.password)
    userDTO.created_at = new Date()

    if (userRequest.document) userDTO.document = this.crytographService.encrypt(userRequest.document)
    if (userRequest.donation_link) userDTO.donation_link = userRequest.donation_link

    const isEmailUsed = await this.userRepository.findUserBy('email', userDTO.email)
    const isDocumentUsed = await this.userRepository.findUserBy('document', userDTO.document)
    const isNickNameUsed = await this.userRepository.findUserBy('nickname', userDTO.nickname)

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
      status: CreateUserResultStatusOptions.success,
      user: this.to_user(createdUser)
    }
  }
}
