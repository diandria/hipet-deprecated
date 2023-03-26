import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { MissingParamError, WrongParamError } from '../../../../config/controllers/errors'
import { badRequest, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { CreateUserUseCaseInterface, CreateUserResultStatusOptions } from '../../usecases/interfaces'

export class CreateUserController implements HttpController {
  constructor (
    private readonly userUseCases: CreateUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.body

      const requiredFields = ['type', 'name', 'email', 'nickname', 'phone_number', 'password']
      for (const field of requiredFields) {
        if (!requestData[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const result = await this.userUseCases.create(requestData)

      if (result.status === CreateUserResultStatusOptions.unique_key_field) {
        return badRequest(new WrongParamError(result.status))
      }

      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
