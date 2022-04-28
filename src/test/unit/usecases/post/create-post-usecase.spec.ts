import { PostRepository } from '../../../../hipet/repositories/interfaces'
import { CreatePostUseCase } from '../../../../hipet/usecases/implementations'
import { CreatePostResultStatusOptions, CreatePostUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { mockAnimal } from '../../../mocks/entity'
import { PostRepositoryStub, UserRepositoryStub } from '../../../mocks/repositories'

interface SutTypes {
  sut: CreatePostUseCaseInterface
  postRepositoryStub: PostRepository
  userRepositoryStub: UserRepositoryStub
}

const makeSut = (): SutTypes => {
  const postRepositoryStub = new PostRepositoryStub()
  const userRepositoryStub = new UserRepositoryStub()
  const sut = new CreatePostUseCase({ postRepository: postRepositoryStub, userRepository: userRepositoryStub })
  return {
    sut,
    postRepositoryStub,
    userRepositoryStub
  }
}

const makePostRequest = {
  userEmail: 'any_email@mail.com',
  picture: 'any_url.com.br',
  description: 'any_description',
  animal: mockAnimal()
}

describe('Post - Use Case', () => {
  describe('Create Post', () => {
    test('Should return USER_NOT_EXISTS status if get user returns null', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(async () => null) // throw

      const createPostResult = await sut.create(makePostRequest)
      expect(createPostResult).toEqual({
        status: CreatePostResultStatusOptions.user_not_found
      })
    })

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
