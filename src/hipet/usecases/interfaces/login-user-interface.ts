export type LoginRequest = {
  email: string
  password: string
}

// create user helpers
export enum LoginUserResultStatusOptions {
  success = 'SUCCESS',
  login_error = 'LOGIN_ERROR',
}

export type LoginUserResult = {
  status: LoginUserResultStatusOptions
}
// interfaces
export interface LoginUserUseCaseInterface {
  login: (loginRequest: LoginRequest) => Promise<LoginUserResult>
}
