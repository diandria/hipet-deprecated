import { HttpRequest } from '../../../../../config/controllers/contracts'
import { MissingParamError, ServerError } from '../../../../../config/controllers/errors'
import { serverError, badRequest, success } from '../../../../../config/controllers/helpers/http-helpers'
import { CreatePostController } from '../../../../hipet/controllers'
import { CreatePostUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { makeCreatePostUseCase } from '../../../mocks/usecases/post-usecases-mock'

interface SutTypes {
  sut: CreatePostController
  createPostUseCaseStub: CreatePostUseCaseInterface
}

const makeSut = (): SutTypes => {
  const createPostUseCaseStub = makeCreatePostUseCase()
  const sut = new CreatePostController(createPostUseCaseStub)
  return {
    sut,
    createPostUseCaseStub
  }
}

const mockBody = {
  title: 'any_title',
  text: 'any_post_text',
  userNickname: 'any_nickname'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Create Post Controller', () => {
  test('Should return 500 if CreatePostUseCase throws', async () => {
    const { sut, createPostUseCaseStub } = makeSut()
    jest.spyOn(createPostUseCaseStub, 'create').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if is missing a parameter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({}))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('title')))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS'
    }))
  })
})
