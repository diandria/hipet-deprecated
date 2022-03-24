import { UserRepository } from '../../../hipet/repositories/interfaces'
import { UserUseCases } from '../../../hipet/usecases/implementations'
import { CreateUserResultStatusOptions, UserUseCasesInterface } from '../../../hipet/usecases/interfaces'
import { UserRepositoryStub } from '../../mocks/repositories'

interface SutTypes {
  sut: UserUseCasesInterface
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

describe('User - Use Case', () => {
  describe('Create User', () => {
    test('Should return REPOSITORY_ERROR status if repository throws', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'add').mockImplementationOnce(() => null)

      const createUserResult = await sut.createUser('any_name', 'any_email@mail.com', 'any_password_123', '(00) 1234-5678')
      expect(createUserResult).toEqual({
        status: CreateUserResultStatusOptions.repository_error,
        user: null
      })
    })

    test('Should return SUCCESS status and the correct data user', async () => {
      const { sut } = makeSut()
      const createUserResult = await sut.createUser('any_name', 'any_email@mail.com', 'any_password_123', '(00) 1234-5678')

      expect(createUserResult).toEqual({
        status: CreateUserResultStatusOptions.success,
        user: {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email@mail.com',
          password: 'any_password_123',
          phoneNumber: '(00) 1234-5678'
        }
      })
    })
  })
})
