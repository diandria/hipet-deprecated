import { Post } from '../../entities'

// list post helpers
export enum ListPostResultStatusOptions {
  success = 'SUCCESS',
  repository_error = 'REPOSITORY_ERROR',
}

export type ListPostResult = {
  status: ListPostResultStatusOptions
  posts: Post[]
}

// interfaces
export interface ListPostUseCaseInterface {
  list: () => Promise<ListPostResult>
}
