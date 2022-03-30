
import { CreateUserResultStatusOptions } from './user-usecases-interface'

export type LoginRequest={
  email: string
  password: string
}

export type LoginUserResult = {
    status: CreateUserResultStatusOptions
    
 }
// interfaces
export interface LoginUserUseCasesInterface {
  login: (loginRequest: LoginRequest) => Promise<LoginUserResult>
}
