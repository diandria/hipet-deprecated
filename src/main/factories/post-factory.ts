import { CreatePostController } from '../../hipet/controllers'
import { MongoPostRepository, MongoUserRepository } from '../../hipet/repositories/implementations'
import { NodeCryptographService, NodeUuidService } from '../../hipet/services/implementations'
import { CreatePostUseCase } from '../../hipet/usecases/implementations'

export const makeCreatePostController = (): CreatePostController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const reportUseCases = new CreatePostUseCase({ postRepository, userRepository, crytographService })

  return new CreatePostController(reportUseCases)
}
