import {
  CreatePostUseCaseInterface, CreatePostResult, CreatePostResultStatusOptions, CreatePostRequest,
  ListPostUseCaseInterface, ListPostResult, ListPostResultStatusOptions
} from '../../../hipet/usecases/interfaces'
import { mockPost } from '../entity'

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

export const makeListPostUseCase = (): ListPostUseCaseInterface => {
  class ListPostUseCaseStub implements ListPostUseCaseInterface {
    async list (): Promise<ListPostResult> {
      return {
        status: ListPostResultStatusOptions.success,
        posts: [mockPost()]
      }
    }
  }
  return new ListPostUseCaseStub()
}
