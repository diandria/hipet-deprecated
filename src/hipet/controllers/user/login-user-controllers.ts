import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { UserUseCasesInterface } from '../../usecases/interfaces'
import { LoginUserUseCasesInterface } from '../../usecases/interfaces/login-user-interface'

export class LoginUserController implements HttpController {
  constructor (
    private readonly loginUseCases: LoginUserUseCasesInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.body
      const result = await this.loginUseCases.login(requestData)
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
