import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { MissingParamError } from '../../../../config/controllers/errors'
import { badRequest, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { GetUserUseCaseInterface } from '../../usecases/interfaces'

export class GetUserController implements HttpController {
  constructor (
    private readonly userUseCases: GetUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.params

      const requiredFields = ['email']
      for (const field of requiredFields) {
        if (!requestData[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const result = await this.userUseCases.get(requestData)
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
