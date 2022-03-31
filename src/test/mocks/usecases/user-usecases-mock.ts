import { CreateUserUseCaseInterface, CreateUserResult, CreateUserResultStatusOptions, UserRequest } from '../../../hipet/usecases/interfaces'

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
