import {
  CreatePostUseCaseInterface, CreatePostResult, CreatePostResultStatusOptions, CreatePostRequest
} from '../../../hipet/usecases/interfaces'

export const makeCreatePostUseCase = (): CreatePostUseCaseInterface => {
  class PostUseCaseStub implements CreatePostUseCaseInterface {
    async create (postRequest: CreatePostRequest): Promise<CreatePostResult> {
      return {
        status: CreatePostResultStatusOptions.success
      }
    }
  }
  return new PostUseCaseStub()
}
