import { ServerError } from '../../../../../config/controllers/errors'
import { serverError, success } from '../../../../../config/controllers/helpers/http-helpers'
import { ListPostController } from '../../../../hipet/controllers'
import { ListPostUseCaseInterface } from '../../../../hipet/usecases/interfaces'
import { mockPost } from '../../../mocks/entity'
import { makeListPostUseCase } from '../../../mocks/usecases/post-usecases-mock'

interface SutTypes {
  sut: ListPostController
  listPostUseCaseStub: ListPostUseCaseInterface
}

const makeSut = (): SutTypes => {
  const listPostUseCaseStub = makeListPostUseCase()
  const sut = new ListPostController(listPostUseCaseStub)
  return {
    sut,
    listPostUseCaseStub
  }
}

describe('List Post Controller', () => {
  test('Should return 500 if ListPostUseCase throws', async () => {
    const { sut, listPostUseCaseStub } = makeSut()
    jest.spyOn(listPostUseCaseStub, 'list').mockImplementationOnce(() => {
      throw new Error()
    })

    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })

  test('Should return 200 if is a sucess', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle()
    expect(httpResponse).toEqual(success({
      status: 'SUCCESS',
      posts: [mockPost()]
    }))
  })
})
