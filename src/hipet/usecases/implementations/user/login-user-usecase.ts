import { UserRepository } from '../../../repositories/interfaces'
import { CryptographService } from '../../../services/interfaces'
import { LoginUserResultStatusOptions, LoginRequest, LoginUserResult, LoginUserUseCaseInterface } from '../../interfaces'

type Dependencies = {
  userRepository: UserRepository
  crytographService: CryptographService
}

export class LoginUserUseCase implements LoginUserUseCaseInterface {
  private readonly userRepository: UserRepository
  private readonly crytographService: CryptographService

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
    this.crytographService = dependencies.crytographService
  }

  async login (loginRequest: LoginRequest): Promise<LoginUserResult> {
    const user = await this.userRepository.findUserBy('email', loginRequest.email)

    if (!user || this.crytographService.decrypt(user.password) !== loginRequest.password) {
      return {
        status: LoginUserResultStatusOptions.login_error
      }
    }

    return {
      status: LoginUserResultStatusOptions.success
    }
  }
}
