import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { MissingParamError } from '../../../../config/controllers/errors'
import { badRequest, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { LoginUserUseCaseInterface } from '../../usecases/interfaces/login-user-interface'

export class LoginUserController implements HttpController {
  constructor (
    private readonly loginUseCases: LoginUserUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.body

      const requiredFields = ['email', 'password']
      for (const field of requiredFields) {
        if (!requestData[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const result = await this.loginUseCases.login(requestData)
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
