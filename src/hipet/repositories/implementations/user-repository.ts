import { UserRepository } from '../interfaces/user-repository-interface'
import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { UserDTO } from '../models'

const collectionName = 'User'

export class MongoUserRepository implements UserRepository {
  async add (user: UserDTO): Promise<boolean> {
    try {
      return await MongoHelper.addBy(user, collectionName)
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
