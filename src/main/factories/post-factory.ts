import { CreatePostController, ListPostController } from '../../hipet/controllers'
import { MongoPostRepository, MongoUserRepository } from '../../hipet/repositories/implementations'
import { CreatePostUseCase, ListPostUseCase } from '../../hipet/usecases/implementations'

export const makeCreatePostController = (): CreatePostController => {
  const postRepository = new MongoPostRepository()
  const userRepository = new MongoUserRepository()
  const postUseCases = new CreatePostUseCase({ postRepository, userRepository })

  return new CreatePostController(postUseCases)
}

export const makeListPostController = (): ListPostController => {
  const postRepository = new MongoPostRepository()
  const postUseCases = new ListPostUseCase({ postRepository })

  return new ListPostController(postUseCases)
}
