import { CreatePostController, FindPostByIdController, ListAllPostController } from '../../hipet/controllers'
import { MongoPostRepository, MongoReportRepository, MongoUserRepository } from '../../hipet/repositories/implementations'
import { NodeCryptographService, NodeUuidService } from '../../hipet/services/implementations'
import { CreatePostUseCase, FindPostByIdUseCase, ListAllPostUseCase } from '../../hipet/usecases/implementations'

export const makeCreatePostController = (): CreatePostController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const reportUseCases = new CreatePostUseCase({ postRepository, userRepository, crytographService })

  return new CreatePostController(reportUseCases)
}

export const makeFindPostByIdController = (): FindPostByIdController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportRepository = new MongoReportRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const postUseCases = new FindPostByIdUseCase({ postRepository, userRepository, reportRepository, crytographService })

  return new FindPostByIdController(postUseCases)
}

export const makeListAllPostController = (): ListAllPostController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportRepository = new MongoReportRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const findPostByIdUseCase = new FindPostByIdUseCase({ postRepository, userRepository, reportRepository, crytographService })
  const postUseCases = new ListAllPostUseCase({ postRepository, findPostByIdUseCase })

  return new ListAllPostController(postUseCases)
}
