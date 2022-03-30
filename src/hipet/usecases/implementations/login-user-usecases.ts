import { UserRepository } from '../../repositories/interfaces'
import {  CreateUserResultStatusOptions, UserUseCasesInterface, UserRequest} from '../interfaces'
import { LoginRequest, LoginUserResult, LoginUserUseCasesInterface } from '../interfaces/login-user-interface'


type Dependencies = {
  userRepository: UserRepository
}

export class LoginUserUseCase implements LoginUserUseCasesInterface {
  private readonly userRepository: UserRepository

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
  }

  async login(loginRequest :LoginRequest): Promise<LoginUserResult> {


    const user = await this.userRepository.findUser(loginRequest.email )

    console.log("user: " + user)

    // if (!user) {
    //   return {
    //     status: CreateUserResultStatusOptions.login_error
    //   }
    // }
    // if (loginRequest.password == user.password){
      
    // }

    return {
      status: CreateUserResultStatusOptions.success
    }
  }
}
