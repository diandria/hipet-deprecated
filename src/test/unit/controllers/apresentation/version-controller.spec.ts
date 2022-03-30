import { ServerError } from '../../../../../config/controllers/errors'
import { serverError, success } from '../../../../../config/controllers/helpers/http-helpers'
import { VersionController } from '../../../../hipet/controllers/apresentation/version-controller'
import { ApresentationUseCases } from '../../../../hipet/usecases/implementations'

const makeApresentationUseCases = (): ApresentationUseCases => {
  class ApresentationUseCasesStub implements ApresentationUseCases {
    getVersion (): any {
      return {
        status: 'any_status',
        version: 'any_version',
        description: 'any_description'
      }
    }
  }
  return new ApresentationUseCasesStub()
}

interface SutTypes {
  sut: VersionController
  ApresentationUseCasesStub: ApresentationUseCases
}

const makeSut = (): SutTypes => {
  const ApresentationUseCasesStub = makeApresentationUseCases()
  const sut = new VersionController(ApresentationUseCasesStub)
  return {
    sut,
    ApresentationUseCasesStub
  }
}

describe('Version Controller', () => {
  test('Should return 500 if ApresentationUseCases throws', async () => {
    const { sut, ApresentationUseCasesStub } = makeSut()
    jest.spyOn(ApresentationUseCasesStub, 'getVersion').mockImplementationOnce(() => {
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
