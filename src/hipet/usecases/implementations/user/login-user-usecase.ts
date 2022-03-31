import { UserRepository } from '../../../repositories/interfaces'
import { LoginUserResultStatusOptions, LoginRequest, LoginUserResult, LoginUserUseCasesInterface } from '../../interfaces'

type Dependencies = {
  userRepository: UserRepository
}

export class LoginUserUseCase implements LoginUserUseCasesInterface {
  private readonly userRepository: UserRepository

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
  }

  async login (loginRequest: LoginRequest): Promise<LoginUserResult> {
    const user = await this.userRepository.findUserBy('email', loginRequest.email)

    if (!user || user.password !== loginRequest.password) {
      return {
        status: LoginUserResultStatusOptions.login_error
      }
    }

    return {
      status: LoginUserResultStatusOptions.success
    }
  }
}
