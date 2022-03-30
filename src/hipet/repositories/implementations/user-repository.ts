import { UserRepository } from '../interfaces/user-repository-interface'
import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { User } from '../../entities'

export class MongoUserRepository implements UserRepository {
  async add (user: User): Promise<User> {
    try {
      return await MongoHelper.addBy(user, 'users')
    } catch (err) {
      return null
    }
  }
}
