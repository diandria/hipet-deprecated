import { UserRepository } from '../../../../hipet/repositories/interfaces'
import { UserUseCases } from '../../../../hipet/usecases/implementations'
import { CreateUserResultStatusOptions, CreateUserUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { UserRepositoryStub } from '../../../mocks/repositories'

interface SutTypes {
  sut: CreateUserUseCaseInterface
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const sut = new UserUseCases({ userRepository: userRepositoryStub })
  return {
    sut,
    userRepositoryStub
  }
}

const makeUserRequest = {
  document: '123.456.789-00',
  email: 'any_email@mail.com',
  name: 'any_name',
  nickName: 'any_nickname',
  password: 'any_password',
  phoneNumber: '(00) 1234-5678'
}

describe('User - Use Case', () => {
  describe('Create User', () => {
    test('Should return REPOSITORY_ERROR status if repository throws', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'add').mockImplementationOnce(() => null)

      const createUserResult = await sut.saveUser(makeUserRequest)
      expect(createUserResult).toEqual({
        status: CreateUserResultStatusOptions.repository_error
      })
    })

    test('Should return SUCCESS status and the correct data user', async () => {
      const { sut } = makeSut()
      const createUserResult = await sut.saveUser(makeUserRequest)

      expect(createUserResult).toEqual({
        status: CreateUserResultStatusOptions.success
      })
    })
  })
})
