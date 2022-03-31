import { HttpRequest } from '../../../../../config/controllers/contracts'
import { MissingParamError, ServerError } from '../../../../../config/controllers/errors'
import { serverError, badRequest, success } from '../../../../../config/controllers/helpers/http-helpers'
import { CreateUserController } from '../../../../hipet/controllers'
import { CreateUserUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { makeCreateUserUseCase } from '../../../mocks/usecases/user-usecases-mock'

interface SutTypes {
  sut: CreateUserController
  createUserUseCaseStub: CreateUserUseCaseInterface
}

const makeSut = (): SutTypes => {
  const createUserUseCaseStub = makeCreateUserUseCase()
  const sut = new CreateUserController(createUserUseCaseStub)
  return {
    sut,
    createUserUseCaseStub
  }
}

const mockBody = {
  document: '123.456.789-00',
  email: 'any_email@mail.com',
  name: 'any_name',
  nickName: 'any_nickname',
  password: 'any_password',
  phoneNumber: '(00) 1234-5678'
}

const makeRequest = (body: any): HttpRequest => ({ body })

describe('Create User Controller', () => {
  test('Should return 500 if CreateUserUseCase throws', async () => {
    const { sut, createUserUseCaseStub } = makeSut()
    jest.spyOn(createUserUseCaseStub, 'saveUser').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 400 if is missing a parameter', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest({}))
    expect(httpResponse).toEqual(badRequest(new MissingParamError('name')))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest(mockBody))
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS'
    }))
  })
})
