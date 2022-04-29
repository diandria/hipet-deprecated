import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { MissingParamError, WrongParamError } from '../../../../config/controllers/errors'
import { badRequest, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { GetUserResultStatusOptions, GetUserUseCaseInterface } from '../../usecases/interfaces'

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

      if (result.status === GetUserResultStatusOptions.user_not_exists) {
        return badRequest(new WrongParamError(result.status))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
