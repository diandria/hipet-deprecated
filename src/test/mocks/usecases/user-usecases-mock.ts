import {
  CreateUserUseCaseInterface, CreateUserResult, CreateUserResultStatusOptions,
  UserRequest, LoginUserResultStatusOptions, LoginUserResult, LoginUserUseCaseInterface,
  GetUserRequest, GetUserUseCaseInterface, GetUserResultStatusOptions, GetUserResult
} from '../../../hipet/usecases/interfaces'
import { mockUser } from '../entity'

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

export const makeGetUserUseCase = (): GetUserUseCaseInterface => {
  class GetUserUseCaseStub implements GetUserUseCaseInterface {
    async get (getUserRequest: GetUserRequest): Promise<GetUserResult> {
      return {
        status: GetUserResultStatusOptions.success,
        user: mockUser
      }
    }
  }
  return new GetUserUseCaseStub()
}
