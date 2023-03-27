import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { ContentNotFoundError } from '../../../../config/controllers/errors'
import { notFound, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { DisableUserUseCaseInterface, DisableUserResultStatusOptions } from '../../usecases/interfaces'

export class DisableUserController implements HttpController {
  constructor (
    private readonly userUseCases: DisableUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestParams = httpRequest.params

      const result = await this.userUseCases.disable({ id: requestParams.id })

      if (result.status === DisableUserResultStatusOptions.user_not_found) {
        return notFound(new ContentNotFoundError('User', requestParams.id))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
