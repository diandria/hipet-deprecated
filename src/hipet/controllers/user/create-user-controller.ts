import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { UserUseCasesInterface } from '../../usecases/interfaces'

export class CreateUserController implements HttpController {
  constructor (
    private readonly userUseCases: UserUseCasesInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.body
      const result = await this.userUseCases.createUser(requestData.name, requestData.email, requestData.password, requestData.phoneNumber)
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
