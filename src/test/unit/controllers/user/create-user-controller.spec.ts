import { ServerError } from '../../../../../config/controllers/errors'
import { serverError, success } from '../../../../../config/controllers/helpers/http-helpers'
import { CreateUserController } from '../../../../hipet/controllers'
import { UserUseCasesInterface } from '../../../../hipet/usecases/interfaces'
import { makeUserUseCases } from '../../../mocks/usecases'

interface SutTypes {
  sut: CreateUserController
  userUseCasesStub: UserUseCasesInterface
}

const makeSut = (): SutTypes => {
  const userUseCasesStub = makeUserUseCases()
  const sut = new CreateUserController(userUseCasesStub)
  return {
    sut,
    userUseCasesStub
  }
}

const makeRequest = {
  body: {
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password_123',
    phoneNumber: '(00) 1234-5678'
  }
}

describe('Version Controller', () => {
  test('Should return 500 if UserUseCases throws', async () => {
    const { sut, userUseCasesStub } = makeSut()
    jest.spyOn(userUseCasesStub, 'createUser').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeRequest)
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      user: {
        id: 'any_id',
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password_123',
        phoneNumber: '(00) 1234-5678'
      }
    }))
  })
})
