export type CreatePostRequest={
  title: string
  text: string
  userNickname: string
}

// create post helpers
export enum CreatePostResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR'
}

export type CreatePostResult = {
  status: CreatePostResultStatusOptions
}

// interfaces
export interface CreatePostUseCaseInterface {
  create: (createPostRequest: CreatePostRequest) => Promise<CreatePostResult>
}
