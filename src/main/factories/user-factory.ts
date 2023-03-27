import { CreateUserController } from '../../hipet/controllers'
import { MongoUserRepository } from '../../hipet/repositories/implementations'
import { NodeCryptographService } from '../../hipet/services/implementations'
import { NodeUuidService } from '../../hipet/services/implementations/node-uuid-service'
import { CreateUserUseCase } from '../../hipet/usecases/implementations'

export const makeCreateUserController = (): CreateUserController => {
  const uuidService = new NodeUuidService()
  const userRepository = new MongoUserRepository({ uuidService })
  const crytographService = new NodeCryptographService()
  const userUseCases = new CreateUserUseCase({ userRepository, crytographService })

  return new CreateUserController(userUseCases)
}
