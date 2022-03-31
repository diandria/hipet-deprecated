import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { MongoUserRepository } from '../../../hipet/repositories/implementations'
import { UserRepository } from '../../../hipet/repositories/interfaces'
import { UserDTOmock } from '../../mocks/repositories/models'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('user')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): UserRepository => {
    return new MongoUserRepository()
  }

  test('Shoult return an user account on success', async () => {
    const sut = makeSut()

    const isUserCreated = await sut.add(UserDTOmock())
    expect(isUserCreated).toBeTruthy()
  })
})
