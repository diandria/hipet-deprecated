import { UserRepository } from '../interfaces/user-repository-interface'
import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { User } from '../../entities'

export class MongoUserRepository implements UserRepository {
  async add (user: User): Promise<User> {
    try {
      const accountCollection = await MongoHelper.getCollection('users')
      const result = await accountCollection.insertOne(user)
      return MongoHelper.map(result.ops[0])
    } catch (err) {
      return null
    }
  }
}
