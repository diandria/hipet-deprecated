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
    const userCollection = await MongoHelper.getCollection('Users')
    await userCollection.deleteMany({})
  })

  const makeSut = (): UserRepository => {
    return new MongoUserRepository()
  }

  describe('User Repository', () => {
    describe('Add', () => {
      test('Shoult return an user account on success', async () => {
        const sut = makeSut()

        const isUserCreated = await sut.add(UserDTOmock())
        expect(isUserCreated).toBeTruthy()
      })
    })

    describe('List User By', () => {
      test('Shoult return null if user doesnt exists', async () => {
        const sut = makeSut()

        const user = await sut.findUserBy('email', 'inexistent_email@mail.com')
        expect(user).toBeNull()
      })

      test('Shoult return an user account on success', async () => {
        const sut = makeSut()
        await sut.add(UserDTOmock())

        const user = await sut.findUserBy('email', 'any_email@mail.com')
        expect(user).toBeTruthy()
        expect(user._id).toBeTruthy()
        expect(user.name).toBe('any_name')
        expect(user.email).toBe('any_email@mail.com')
        expect(user.password).toBe('any_password')
        expect(user.phoneNumber).toBe('(00) 1234-5678')
        expect(user.nickName).toBe('any_nickname')
        expect(user.document).toBe('123.456.789-00')
      })
    })
  })
})
