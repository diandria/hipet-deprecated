import { CreatePostController, DeletePostController, FindPostByIdController, GetPostShareUrlController, ListAllPostController, ListPostByAnimalTypeController, ListPostByUserController } from '../../hipet/controllers'
import { MongoPostRepository, MongoReportRepository, MongoUserRepository } from '../../hipet/repositories/implementations'
import { NodeCryptographService, NodeUuidService } from '../../hipet/services/implementations'
import { CreatePostUseCase, DeletePostUseCase, FindPostByIdUseCase, GetPostShareUrlUseCase, ListAllPostUseCase, ListPostByAnimalTypeUseCase, ListPostByUserUseCase } from '../../hipet/usecases/implementations'

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

export const makeListPostByAnimalTypeController = (): ListPostByAnimalTypeController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportRepository = new MongoReportRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const postUseCases = new ListPostByAnimalTypeUseCase({ postRepository, userRepository, reportRepository, crytographService })

  return new ListPostByAnimalTypeController(postUseCases)
}

export const makeGetPostShareUrlController = (): GetPostShareUrlController => {
  const uuidService = new NodeUuidService()
  const postRepository = new MongoPostRepository({ uuidService })
  const postUseCases = new GetPostShareUrlUseCase({ postRepository })

  return new GetPostShareUrlController(postUseCases)
}

export const makeDeletePostController = (): DeletePostController => {
  const uuidService = new NodeUuidService()
  const postRepository = new MongoPostRepository({ uuidService })
  const reportUseCases = new DeletePostUseCase({ postRepository })

  return new DeletePostController(reportUseCases)
}
