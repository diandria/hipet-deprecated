import { CreatePostController, FindPostByIdController, ListAllPostController, ListPostByUserController } from '../../hipet/controllers'
import { MongoPostRepository, MongoReportRepository, MongoUserRepository } from '../../hipet/repositories/implementations'
import { NodeCryptographService, NodeUuidService } from '../../hipet/services/implementations'
import { CreatePostUseCase, FindPostByIdUseCase, ListAllPostUseCase, ListPostByUserUseCase } from '../../hipet/usecases/implementations'

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
  const postUseCases = new ListAllPostUseCase({ postRepository, userRepository, reportRepository, crytographService })

  return new ListAllPostController(postUseCases)
}

export const makeListPostByUserController = (): ListPostByUserController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportRepository = new MongoReportRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const postUseCases = new ListPostByUserUseCase({ postRepository, userRepository, reportRepository, crytographService })

  return new ListPostByUserController(postUseCases)
}
