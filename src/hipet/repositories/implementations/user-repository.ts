import { UserRepository } from '../interfaces/user-repository-interface'
import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { UserDTO } from '../models'

export class MongoUserRepository implements UserRepository {
  async add (user: UserDTO): Promise<boolean> {
    try {
      return await MongoHelper.addBy(user, 'Users')
    } catch (err) {
      return false
    }
  }

  async findUserBy (field: string, value: any): Promise<UserDTO> {
    try {
      return await MongoHelper.findBy(field, value, 'Users')
    } catch (err) {
      return null
    }
  }
}
