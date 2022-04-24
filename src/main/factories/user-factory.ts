import { CreateUserController, GetUserController, LoginUserController } from '../../hipet/controllers'
import { MongoUserRepository } from '../../hipet/repositories/implementations'
import { CreateUserUseCase, GetUserUseCase, LoginUserUseCase } from '../../hipet/usecases/implementations'

export const makeCreateUserController = (): CreateUserController => {
  const userRepository = new MongoUserRepository()
  const userUseCases = new CreateUserUseCase({ userRepository })

  return new CreateUserController(userUseCases)
}

export const makeLoginUserController = (): LoginUserController => {
  const userRepository = new MongoUserRepository()
  const loginUseCases = new LoginUserUseCase({ userRepository })

  return new LoginUserController(loginUseCases)
}

export const makeGetUserController = (): GetUserController => {
  const userRepository = new MongoUserRepository()
  const userUseCases = new GetUserUseCase({ userRepository })

  return new GetUserController(userUseCases)
}
