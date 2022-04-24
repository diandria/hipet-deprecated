import { PostRepository } from '../interfaces/post-repository-interface'
import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { PostDTO } from '../models'

export class MongoPostRepository implements PostRepository {
  async add (post: PostDTO): Promise<boolean> {
    try {
      return await MongoHelper.addBy(post, 'Posts')
    } catch (err) {
      return false
    }
  }

  async findPostBy (field: string, value: any): Promise<PostDTO> {
    try {
      return await MongoHelper.findBy(field, value, 'Posts')
    } catch (err) {
      return null
    }
  }
}
