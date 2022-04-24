import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { MongoPostRepository } from '../../../hipet/repositories/implementations'
import { PostRepository } from '../../../hipet/repositories/interfaces'
import { PostDTOmock } from '../../mocks/repositories/models'

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const postCollection = await MongoHelper.getCollection('Posts')
    await postCollection.deleteMany({})
  })

  const makeSut = (): PostRepository => {
    return new MongoPostRepository()
  }

  describe('Post Repository', () => {
    describe('Add', () => {
      test('Shoult return an post data on success', async () => {
        const sut = makeSut()

        const isPostCreated = await sut.add(PostDTOmock())
        expect(isPostCreated).toBeTruthy()
      })
    })

    describe('List Post By', () => {
      test('Shoult return null if post doesnt exists', async () => {
        const sut = makeSut()

        const post = await sut.findPostBy('_id', 'any_id')
        expect(post).toBeNull()
      })

      test('Shoult return an post data on success', async () => {
        const sut = makeSut()
        await sut.add(PostDTOmock())

        const post = await sut.findPostBy('_id', 'any_id')
        expect(post).toBeTruthy()
        expect(post._id).toBeTruthy()
        expect(post.title).toBe('any_title')
        expect(post.text).toBe('any_post_text')
        expect(post.userNickname).toBe('any_user_nickname')
      })
    })
  })
})
