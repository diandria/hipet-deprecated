import { User } from '../../entities'

export type GetUserRequest = {
  email: string
}

// create user helpers
export enum GetUserResultStatusOptions {
  success = 'SUCCESS',
  user_not_exists = 'USER_NOT_EXISTS',
  repository_error = 'REPOSITORY_ERROR'
}

export type GetUserResult = {
  status: GetUserResultStatusOptions
  user: User
}

// interfaces
export interface GetUserUseCaseInterface {
  get: (getUserRequest: GetUserRequest) => Promise<GetUserResult>
}
