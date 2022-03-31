import { UserUseCasesInterface, CreateUserResult, CreateUserResultStatusOptions, UserRequest } from '../../../hipet/usecases/interfaces'

export const makeUserUseCases = (): UserUseCasesInterface => {
  class UserUseCaseStub implements UserUseCasesInterface {
    async saveUser (userRequest: UserRequest): Promise<CreateUserResult> {
      return {
        status: CreateUserResultStatusOptions.success
      }
    }
  }
  return new UserUseCaseStub()
}
