import { UserRepository } from '../../../../hipet/repositories/interfaces'
import { LoginUserUseCase } from '../../../../hipet/usecases/implementations'
import { LoginUserResultStatusOptions, LoginUserUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { UserRepositoryStub } from '../../../mocks/repositories'

interface SutTypes {
  sut: LoginUserUseCaseInterface
  userRepositoryStub: UserRepository
}

const makeSut = (): SutTypes => {
  const userRepositoryStub = new UserRepositoryStub()
  const sut = new LoginUserUseCase({ userRepository: userRepositoryStub })
  return {
    sut,
    userRepositoryStub
  }
}

const makeUserRequest = {
  email: 'any_email@mail.com',
  password: 'any_password'
}

describe('User - Use Case', () => {
  describe('Login User', () => {
    test('Should return LOGIN_ERROR if a data is wrong', async () => {
      const { sut, userRepositoryStub } = makeSut()
      jest.spyOn(userRepositoryStub, 'findUserBy').mockImplementationOnce(null) // user doesnt find

      const createUserResult = await sut.login(makeUserRequest)
      expect(createUserResult).toEqual({
        status: LoginUserResultStatusOptions.login_error
      })
    })

    test('Should return SUCCESS status if data is correct', async () => {
      const { sut } = makeSut()
      const loginUserResult = await sut.login(makeUserRequest)

      expect(loginUserResult).toEqual({
        status: LoginUserResultStatusOptions.success
      })
    })
  })
})
