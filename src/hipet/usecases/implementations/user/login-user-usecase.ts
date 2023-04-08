import { UserRepository } from '../../../repositories/interfaces'
import { LoginUserResult, LoginUserResultStatusOptions, LoginUserUseCaseInterface, LoginUserRequest } from '../../interfaces/user'
import { CryptographService, UuidService } from '../../../services/interfaces'

type Dependencies = {
  userRepository: UserRepository
  crytographService: CryptographService
  uuidService: UuidService
}

export class LoginUserUseCase implements LoginUserUseCaseInterface {
  private readonly userRepository: UserRepository
  private readonly crytographService: CryptographService
  private readonly uuidService: UuidService

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
    this.crytographService = dependencies.crytographService
    this.uuidService = dependencies.uuidService
  }

  async authenticate (userRequest: LoginUserRequest): Promise<LoginUserResult> {
    const user = await this.userRepository.findUserBy('email', userRequest.email)
    if (!user) {
      return {
        status: LoginUserResultStatusOptions.user_not_found
      }
    }

    const decryptPassword = this.crytographService.decrypt(user.password)
    if (decryptPassword !== userRequest.password) {
      return {
        status: LoginUserResultStatusOptions.wrong_password
      }
    }

    const authenticationCode = this.uuidService.uuid()
    return {
      status: LoginUserResultStatusOptions.success,
      authentication_code: authenticationCode
    }
  }
}
