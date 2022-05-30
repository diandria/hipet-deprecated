import { CreateUserController, GetUserController, LoginUserController } from '../../hipet/controllers'
import { MongoUserRepository } from '../../hipet/repositories/implementations'
import { NodeCryptographService } from '../../hipet/services/implementations'
import { CreateUserUseCase, GetUserUseCase, LoginUserUseCase } from '../../hipet/usecases/implementations'

export const makeCreateUserController = (): CreateUserController => {
  const userRepository = new MongoUserRepository()
  const crytographService = new NodeCryptographService()
  const userUseCases = new CreateUserUseCase({ userRepository, crytographService })

  return new CreateUserController(userUseCases)
}

export const makeLoginUserController = (): LoginUserController => {
  const userRepository = new MongoUserRepository()
  const crytographService = new NodeCryptographService()
  const loginUseCases = new LoginUserUseCase({ userRepository, crytographService })

  return new LoginUserController(loginUseCases)
}

export const makeGetUserController = (): GetUserController => {
  const userRepository = new MongoUserRepository()
  const crytographService = new NodeCryptographService()
  const userUseCases = new GetUserUseCase({ userRepository, crytographService })

  return new GetUserController(userUseCases)
}
