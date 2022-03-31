import { HttpRequest } from '../../../../../config/controllers/contracts'
import { MissingParamError, ServerError } from '../../../../../config/controllers/errors'
import { serverError, badRequest, success } from '../../../../../config/controllers/helpers/http-helpers'
import { LoginUserController } from '../../../../hipet/controllers'
import { LoginUserUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { makeLoginUserUseCase } from '../../../mocks/usecases/user-usecases-mock'

interface SutTypes {
  sut: LoginUserController
  loginUserUseCaseStub: LoginUserUseCaseInterface
}

const makeSut = (): SutTypes => {
  const loginUserUseCaseStub = makeLoginUserUseCase()
  const sut = new LoginUserController(loginUserUseCaseStub)
  return {
    sut,
    loginUserUseCaseStub
  }
}

const mockBody = {
  email: 'any_email@mail.com',
  password: 'any_password'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Login User Controller', () => {
  test('Should return 500 if LoginUserUseCase throws', async () => {
    const { sut, loginUserUseCaseStub } = makeSut()
    jest.spyOn(loginUserUseCaseStub, 'login').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if is missing a parameter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({}))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS'
    }))
  })
})
