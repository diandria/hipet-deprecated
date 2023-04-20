import { CreatePostController, DeletePostController, FindPostByIdController, GetPostShareUrlController, ListAllPostController, ListPostByAnimalTypeController, ListPostByUserController } from '../../hipet/controllers'
import { MongoPostRepository, MongoReportRepository, MongoUserRepository } from '../../hipet/repositories/implementations'
import { NodeUuidService } from '../../hipet/services/implementations'
import { CreatePostUseCase, DeletePostUseCase, FindPostByIdUseCase, GetPostShareUrlUseCase, ListAllPostUseCase, ListPostByAnimalTypeUseCase, ListPostByUserUseCase } from '../../hipet/usecases/implementations'

export const makeCreatePostController = (): CreatePostController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportUseCases = new CreatePostUseCase({ postRepository, userRepository })

  return new CreatePostController(reportUseCases)
}

export const makeFindPostByIdController = (): FindPostByIdController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportRepository = new MongoReportRepository({ uuidService })
  const postUseCases = new FindPostByIdUseCase({ postRepository, userRepository, reportRepository })

  return new FindPostByIdController(postUseCases)
}

export const makeListAllPostController = (): ListAllPostController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportRepository = new MongoReportRepository({ uuidService })
  const postUseCases = new ListAllPostUseCase({ postRepository, userRepository, reportRepository })

  return new ListAllPostController(postUseCases)
}

export const makeListPostByUserController = (): ListPostByUserController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportRepository = new MongoReportRepository({ uuidService })
  const postUseCases = new ListPostByUserUseCase({ postRepository, userRepository, reportRepository })

  return new ListPostByUserController(postUseCases)
}

export const makeListPostByAnimalTypeController = (): ListPostByAnimalTypeController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportRepository = new MongoReportRepository({ uuidService })
  const postUseCases = new ListPostByAnimalTypeUseCase({ postRepository, userRepository, reportRepository })

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
