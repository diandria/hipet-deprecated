import { VersionController } from './version-controller'
import { VersionUseCase } from '../../../usecases/implementations'

const makeVersionUseCase = (): VersionUseCase => {
  class VersionUseCaseStub implements VersionUseCase {
    execute (): any {
      return {
        status: 'any_status',
        version: 'any_version',
        description: 'any_description'
      }
    }
  }
  return new VersionUseCaseStub()
}

interface SutTypes {
  sut: VersionController
  versionUseCaseStub: VersionUseCase
}

const makeSut = (): SutTypes => {
  const versionUseCaseStub = makeVersionUseCase()
  const sut = new VersionController(versionUseCaseStub)
  return {
    sut,
    versionUseCaseStub
  }
}

describe('Version Controller', () => {
  test('Should return 500 if VersionUseCase throws', async () => {
    const { sut, versionUseCaseStub } = makeSut()
    jest.spyOn(versionUseCaseStub, 'execute').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(success({
      description: 'any_description',
      status: 'any_status',
      version: 'any_version'
    }))
  })
})
