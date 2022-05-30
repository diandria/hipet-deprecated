import { Animal } from '../../entities'

export type CreatePostRequest={
  userEmail: string
  picture: string
  description: string
  animal: Animal
  address?: string
}

// create post helpers
export enum CreatePostResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR',
  user_not_found = 'USER_NOT_FOUND'
}

export type CreatePostResult = {
  status: CreatePostResultStatusOptions
}

// interfaces
export interface CreatePostUseCaseInterface {
  create: (createPostRequest: CreatePostRequest) => Promise<CreatePostResult>
}
