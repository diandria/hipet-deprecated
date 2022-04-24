import { HttpRequest } from '../../../../../config/controllers/contracts'
import { MissingParamError, ServerError } from '../../../../../config/controllers/errors'
import { serverError, badRequest, success } from '../../../../../config/controllers/helpers/http-helpers'
import { GetUserController } from '../../../../hipet/controllers'
import { GetUserUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { mockUser } from '../../../mocks/entity'
import { makeGetUserUseCase } from '../../../mocks/usecases/user-usecases-mock'

interface SutTypes {
  sut: GetUserController
  getUserUseCaseStub: GetUserUseCaseInterface
}

const makeSut = (): SutTypes => {
  const getUserUseCaseStub = makeGetUserUseCase()
  const sut = new GetUserController(getUserUseCaseStub)
  return {
    sut,
    getUserUseCaseStub
  }
}

const mockParams = {
  email: 'any_email@mail.com'
}

const makeRequest = (params: any): HttpRequest => ({ params })

describe('Get User Controller', () => {
  test('Should return 500 if GetUserUseCase throws', async () => {
    const { sut, getUserUseCaseStub } = makeSut()
    jest.spyOn(getUserUseCaseStub, 'get').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if is missing a parameter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({}))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockParams))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      user: mockUser
    }))
  })
})
