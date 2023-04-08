import { ReportRepository } from '../interfaces'
import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { ReportDTO } from '../models'
import { UuidService } from '../../services/interfaces'

const collectionName = 'Report'

type Dependencies = {
  uuidService: UuidService
}

export class MongoReportRepository implements ReportRepository {
  private readonly uuidService: UuidService

  constructor (dependencies: Dependencies) {
    this.uuidService = dependencies.uuidService
  }

  async add (post: ReportDTO): Promise<ReportDTO> {
    try {
      post._id = this.uuidService.uuid()
      return await MongoHelper.add(post, collectionName)
    } catch (err) {
      return null
    }
  }

  async findReportBy (field: string, value: any): Promise<ReportDTO> {
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
}
