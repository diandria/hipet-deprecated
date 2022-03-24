import { User } from '../../entities'
import { UserRepository } from '../../repositories/interfaces'
import { CreateUserResult, CreateUserResultStatusOptions, UserUseCasesInterface } from '../interfaces'

type Dependencies = {
  userRepository: UserRepository
}

export class UserUseCases implements UserUseCasesInterface {
  private readonly userRepository: UserRepository

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
  }

  async createUser (name: string, email: string, password: string, phoneNumber: string): Promise<CreateUserResult> {
    const user = new User()

    user.name = name
    user.email = email
    user.password = password
    user.phoneNumber = phoneNumber

    const createdUser = await this.userRepository.add(user)

    if (!createdUser) {
      return {
        status: CreateUserResultStatusOptions.repository_error,
        user: null
      }
    }

    return {
      status: CreateUserResultStatusOptions.success,
      user: createdUser
    }
  }
}
