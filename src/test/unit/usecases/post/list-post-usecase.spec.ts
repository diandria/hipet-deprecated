import { PostRepository } from '../../../../hipet/repositories/interfaces'
import { ListPostUseCase } from '../../../../hipet/usecases/implementations'
import { ListPostResultStatusOptions, ListPostUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { mockPost } from '../../../mocks/entity'
import { PostRepositoryStub } from '../../../mocks/repositories'

interface SutTypes {
  sut: ListPostUseCaseInterface
  postRepositoryStub: PostRepository
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const sut = new ListPostUseCase({ postRepository: postRepositoryStub })
  return {
    sut,
    postRepositoryStub
  }
}

describe('Post - Use Case', () => {
  describe('List Post', () => {
    test('Should return an empty list if doesnt exist any post', async () => {
      const { sut, postRepositoryStub } = makeSut()
      jest.spyOn(postRepositoryStub, 'list').mockImplementationOnce(async () => ([])) // throw

      const listPostResult = await sut.list()
      expect(listPostResult).toEqual({
        status: ListPostResultStatusOptions.success,
        posts: []
      })
    })

    test('Should return REPOSITORY_ERROR status if list method from repository throws', async () => {
      const { sut, postRepositoryStub } = makeSut()
      jest.spyOn(postRepositoryStub, 'list').mockImplementationOnce(async () => null) // throw

      const listPostResult = await sut.list()
      expect(listPostResult).toEqual({
        status: ListPostResultStatusOptions.repository_error,
        posts: null
      })
    })

    test('Should return SUCCESS status and the correct data post', async () => {
      const { sut } = makeSut()
      const listPostResult = await sut.list()

      expect(listPostResult).toEqual({
        status: ListPostResultStatusOptions.success,
        posts: [mockPost()]
      })
    })
  })
})
