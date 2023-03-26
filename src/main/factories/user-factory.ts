import { CreateUserController } from '../../hipet/controllers'
import { MongoUserRepository } from '../../hipet/repositories/implementations'
import { NodeCryptographService } from '../../hipet/services/implementations'
import { CreateUserUseCase } from '../../hipet/usecases/implementations'

export const makeCreateUserController = (): CreateUserController => {
  const userRepository = new MongoUserRepository()
  const crytographService = new NodeCryptographService()
  const userUseCases = new CreateUserUseCase({ userRepository, crytographService })

  return new CreateUserController(userUseCases)
}
