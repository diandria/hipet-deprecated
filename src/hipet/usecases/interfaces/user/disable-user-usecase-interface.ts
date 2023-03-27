export type DisableUserRequest = {
  id: string
}

export enum DisableUserResultStatusOptions {
  success = 'SUCCESS',
  user_not_found = 'USER_NOT_FOUND'
}

export type DisableUserResult = {
  status: DisableUserResultStatusOptions
}

export interface DisableUserUseCaseInterface {
  disable: (userRequest: DisableUserRequest) => Promise<DisableUserResult>
}
