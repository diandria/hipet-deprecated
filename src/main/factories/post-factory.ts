import { CreatePostController } from '../../hipet/controllers'
import { MongoPostRepository } from '../../hipet/repositories/implementations'
import { CreatePostUseCase } from '../../hipet/usecases/implementations'

export const makeCreatePostController = (): CreatePostController => {
  const postRepository = new MongoPostRepository()
  const postUseCases = new CreatePostUseCase({ postRepository })

  return new CreatePostController(postUseCases)
}
