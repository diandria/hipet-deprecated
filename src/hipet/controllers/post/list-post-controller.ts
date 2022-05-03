import { HttpController, HttpResponse } from '../../../../config/controllers/contracts'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { ListPostUseCaseInterface } from '../../usecases/interfaces'

export class ListPostController implements HttpController {
  constructor (
    private readonly postUseCases: ListPostUseCaseInterface
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const result = await this.postUseCases.list()
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
