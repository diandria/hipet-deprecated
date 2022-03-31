import { CreateUserUseCaseInterface, CreateUserResult, CreateUserResultStatusOptions, UserRequest, LoginUserResultStatusOptions, LoginUserResult, LoginUserUseCaseInterface } from '../../../hipet/usecases/interfaces'

export const makeCreateUserUseCase = (): CreateUserUseCaseInterface => {
  class UserUseCaseStub implements CreateUserUseCaseInterface {
    async saveUser (userRequest: UserRequest): Promise<CreateUserResult> {
      return {
        status: CreateUserResultStatusOptions.success
      }
    }
  }
  return new UserUseCaseStub()
}

export const makeLoginUserUseCase = (): LoginUserUseCaseInterface => {
  class LoginUserUseCaseStub implements LoginUserUseCaseInterface {
    async login (userRequest: UserRequest): Promise<LoginUserResult> {
      return {
        status: LoginUserResultStatusOptions.success
      }
    }
  }
  return new LoginUserUseCaseStub()
}
