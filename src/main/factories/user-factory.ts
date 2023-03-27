import { CreateUserController, FindUserByIdController, FindUserByNicknameController, UpdateUserController } from '../../hipet/controllers'
import { MongoUserRepository } from '../../hipet/repositories/implementations'
import { NodeCryptographService } from '../../hipet/services/implementations'
import { NodeUuidService } from '../../hipet/services/implementations/node-uuid-service'
import { CreateUserUseCase, FindUserByIdUseCase, FindUserByNicknameUseCase, UpdateUserUseCase } from '../../hipet/usecases/implementations'

export const makeCreateUserController = (): CreateUserController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const userUseCases = new CreateUserUseCase({ userRepository, crytographService })

  return new CreateUserController(userUseCases)
}

export const makeFindUserByIdController = (): FindUserByIdController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const userUseCases = new FindUserByIdUseCase({ userRepository, crytographService })

  return new FindUserByIdController(userUseCases)
}

export const makeFindUserByNicknameController = (): FindUserByNicknameController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const userUseCases = new FindUserByNicknameUseCase({ userRepository, crytographService })

  return new FindUserByNicknameController(userUseCases)
}

export const makeUpdateUserController = (): UpdateUserController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const userUseCases = new UpdateUserUseCase({ userRepository, crytographService })

  return new UpdateUserController(userUseCases)
}
