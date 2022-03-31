export type UserRequest={
  name: string
  document: string
  email: string
  phoneNumber: string
  password: string
  nickName: string
}

// create user helpers
export enum CreateUserResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR'
}

export type CreateUserResult = {
  status: CreateUserResultStatusOptions
}

// interfaces
export interface CreateUserUseCaseInterface {
  saveUser: (userRequest: UserRequest) => Promise<CreateUserResult>
}
