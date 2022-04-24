import { PostRepository } from '../../../../hipet/repositories/interfaces'
import { CreatePostUseCase } from '../../../../hipet/usecases/implementations'
import { CreatePostResultStatusOptions, CreatePostUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { PostRepositoryStub } from '../../../mocks/repositories'

interface SutTypes {
  sut: CreatePostUseCaseInterface
  postRepositoryStub: PostRepository
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const sut = new CreatePostUseCase({ postRepository: postRepositoryStub })
  return {
    sut,
    postRepositoryStub
  }
}

const makePostRequest = {
  title: 'any_title',
  text: 'any_post_text',
  userNickname: 'any_nickname'
}

describe('Post - Use Case', () => {
  describe('Create Post', () => {
    test('Should return REPOSITORY_ERROR status if add method from repository throws', async () => {
      const { sut, postRepositoryStub } = makeSut()
      jest.spyOn(postRepositoryStub, 'add').mockImplementationOnce(async () => false) // throw

      const createPostResult = await sut.create(makePostRequest)
      expect(createPostResult).toEqual({
        status: CreatePostResultStatusOptions.repository_error
      })
    })

    test('Should return SUCCESS status and the correct data post', async () => {
      const { sut } = makeSut()
      const createPostResult = await sut.create(makePostRequest)

      expect(createPostResult).toEqual({
        status: CreatePostResultStatusOptions.success
      })
    })
  })
})
