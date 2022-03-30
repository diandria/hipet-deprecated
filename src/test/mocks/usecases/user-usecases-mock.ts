import { UserUseCasesInterface, CreateUserResult, CreateUserResultStatusOptions } from '../../../hipet/usecases/interfaces'
import { makeUserMock } from '../entities'

export const makeUserUseCases = (): UserUseCasesInterface => {
  class UserUseCaseStub implements UserUseCasesInterface {
    async createUser (name: string, email: string, password: string, phoneNumber: string): Promise<CreateUserResult> {
      return {
        status: CreateUserResultStatusOptions.success,
        user: makeUserMock()
      }
    }
  }
  return new UserUseCaseStub()
}
