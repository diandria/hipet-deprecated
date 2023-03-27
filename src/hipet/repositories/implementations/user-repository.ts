import { UserRepository } from '../interfaces/user-repository-interface'
import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { UserDTO } from '../models'
import { UuidService } from '../../services/interfaces'

const collectionName = 'User'

type Dependencies = {
  uuidService: UuidService
}

export class MongoUserRepository implements UserRepository {
  private readonly uuidService: UuidService

  constructor (dependencies: Dependencies) {
    this.uuidService = dependencies.uuidService
  }

  async add (user: UserDTO): Promise<UserDTO> {
    try {
      user._id = this.uuidService.uuid()
      return await MongoHelper.add(user, collectionName)
    } catch (err) {
      return null
    }
  }

  async findUserBy (field: string, value: any): Promise<UserDTO> {
    try {
      return await MongoHelper.findBy(field, value, collectionName)
    } catch (err) {
      return null
    }
  }
}
