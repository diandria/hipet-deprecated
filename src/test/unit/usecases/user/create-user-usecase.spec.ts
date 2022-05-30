import { UserRepository } from '../../../../hipet/repositories/interfaces'
import { CryptographService } from '../../../../hipet/services/interfaces'
import { CreateUserUseCase } from '../../../../hipet/usecases/implementations'
import { CreateUserResultStatusOptions, CreateUserUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { UserRepositoryStub } from '../../../mocks/repositories'
import { CryptographServiceStub } from '../../../mocks/services'

interface SutTypes {
  sut: CreateUserUseCaseInterface
  userRepositoryStub: UserRepository
  cryptographServiceStub: CryptographService
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const cryptographServiceStub = new CryptographServiceStub()
  const sut = new CreateUserUseCase({ userRepository: userRepositoryStub, crytographService: cryptographServiceStub })
  return {
    sut,
    userRepositoryStub,
    cryptographServiceStub
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
    test('Should return REPOSITORY_ERROR status if add method from repository throws', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // email
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // document
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // nickName

      jest.spyOn(userRepositoryStub, 'add').mockImplementationOnce(async () => false) // throw

      const createUserResult = await sut.saveUser(makeUserRequest)
      expect(createUserResult).toEqual({
        status: CreateUserResultStatusOptions.repository_error
      })
    })

    test('Should return UNIQUE_KEY_FIELD if any primary key is already used', async () => {
      const { sut } = makeSut()
      const createUserResult = await sut.saveUser(makeUserRequest)

      expect(createUserResult).toEqual({
        status: CreateUserResultStatusOptions.unique_key_field
      })
    })

    test('Should return SUCCESS status and the correct data user', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // email
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // document
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // nickName
      const createUserResult = await sut.saveUser(makeUserRequest)

      expect(createUserResult).toEqual({
        status: CreateUserResultStatusOptions.success
      })
    })
  })
})
