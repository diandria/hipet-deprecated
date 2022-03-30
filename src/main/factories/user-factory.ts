import { CreateUserController } from '../../hipet/controllers'
import { MongoUserRepository } from '../../hipet/repositories/implementations/user-repository'
import { UserUseCases } from '../../hipet/usecases/implementations'

export const makeCreateUserController = (): CreateUserController => {
  const userRepository = new MongoUserRepository()
  const userUseCases = new UserUseCases({ userRepository })

  return new CreateUserController(userUseCases)
}
