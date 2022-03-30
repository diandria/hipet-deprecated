import { User } from '../../entities'

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
  repository_error = 'REPOSITORY_ERROR',
  login_error = 'LOGIN_ERROR',

}

export type CreateUserResult = {
  status: CreateUserResultStatusOptions
  
}

// interfaces
export interface UserUseCasesInterface {
  saveUser: (userRequest: UserRequest) => Promise<CreateUserResult>
}
