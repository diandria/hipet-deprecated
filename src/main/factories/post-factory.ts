import { CreatePostController } from '../../hipet/controllers'
import { MongoPostRepository, MongoUserRepository } from '../../hipet/repositories/implementations'
import { CreatePostUseCase } from '../../hipet/usecases/implementations'

export const makeCreatePostController = (): CreatePostController => {
  const postRepository = new MongoPostRepository()
  const userRepository = new MongoUserRepository()
  const postUseCases = new CreatePostUseCase({ postRepository, userRepository })

  return new CreatePostController(postUseCases)
}
