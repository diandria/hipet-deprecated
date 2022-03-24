import { User } from '../../entities'

// create user helpers
export enum CreateUserResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR'
}

export type CreateUserResult = {
  status: CreateUserResultStatusOptions
  user: User
}

// interfaces
export interface UserUseCasesInterface {
  createUser: (name: string, email: string, password: string, phoneNumber: string) => Promise<CreateUserResult>
}
