import { PostRepository } from '../interfaces'
import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { PostDTO } from '../models'
import { UuidService } from '../../services/interfaces'

const collectionName = 'Post'

type Dependencies = {
  uuidService: UuidService
}

export class MongoPostRepository implements PostRepository {
  private readonly uuidService: UuidService

  constructor (dependencies: Dependencies) {
    this.uuidService = dependencies.uuidService
  }

  async add (post: PostDTO): Promise<PostDTO> {
    try {
      post._id = this.uuidService.uuid()
      return await MongoHelper.add(post, collectionName)
    } catch (err) {
      return null
    }
  }

  async findPostBy (field: string, value: any): Promise<PostDTO> {
    try {
      return await MongoHelper.findBy(field, value, collectionName)
    } catch (err) {
      return null
    }
  }

  async delete (reportId: string): Promise<boolean> {
    try {
      const filter = { _id: reportId }
      return await MongoHelper.remove(filter, collectionName)
    } catch (err) {
      return false
    }
  }

  async listBy (field: string, value: string, limit: number = 20): Promise<PostDTO[]> {
    try {
      const filter = { [field]: value }
      return await MongoHelper.listBy(filter, limit, collectionName)
    } catch {
      return null
    }
  }

  async listAll (limit: number = 20): Promise<PostDTO[]> {
    try {
      return await MongoHelper.list(limit, collectionName)
    } catch {
      return null
    }
  }
}
