import { AgentsRepository } from '../interfaces/agents-repository-interface'
import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'

export class MongoAgentsRepository implements AgentsRepository {
  async add (): Promise<any> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne({
      name: 'diandria'
    })
    return MongoHelper.map(result.ops[0])
  }
}
