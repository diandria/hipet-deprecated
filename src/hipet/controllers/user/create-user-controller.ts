import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { MissingParamError } from '../../../../config/controllers/errors'
import { badRequest, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { CreateUserUseCaseInterface } from '../../usecases/interfaces'

export class CreateUserController implements HttpController {
  constructor (
    private readonly userUseCases: CreateUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.body

      const requiredFields = ['name', 'email', 'password', 'phoneNumber', 'nickName', 'document']
      for (const field of requiredFields) {
        if (!requestData[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const result = await this.userUseCases.saveUser(requestData)
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
