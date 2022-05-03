import { MongoHelper } from '../../../../config/repository/helpers/mongodb/mongo-helper'
import { MongoPostRepository } from '../../../hipet/repositories/implementations'
import { PostRepository } from '../../../hipet/repositories/interfaces'
import { mockAnimal, mockUser } from '../../mocks/entity'
import { mockPostDTO } from '../../mocks/repositories/models'

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

        const isPostCreated = await sut.add(mockPostDTO())
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
        await sut.add(mockPostDTO())

        const post = await sut.findPostBy('_id', 'any_id')
        expect(post).toBeTruthy()
        expect(post._id).toBeTruthy()
        expect(post.user).toEqual(mockUser)
        expect(post.picture).toBe('any_url.com.br')
        expect(post.description).toBe('any_description')
        expect(post.animal).toEqual(mockAnimal())
        expect(post.reports).toEqual([])
        expect(post.createdAt).toEqual(new Date('2022'))
      })
    })

    describe('List All Posts', () => {
      test('Shoult return an empty array if no one post exists', async () => {
        const sut = makeSut()

        const postList = await sut.list()
        expect(postList).toEqual([])
      })

      test('Shoult return a list posts on success', async () => {
        const sut = makeSut()
        const mockPost = mockPostDTO()
        await sut.add(mockPost)

        const postList = await sut.list()
        expect(postList).toEqual([mockPost])
      })
    })
  })
})
