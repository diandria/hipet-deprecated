import { HttpController, HttpRequest, HttpResponse } from '../../../../config/controllers/contracts'
import { MissingParamError } from '../../../../config/controllers/errors'
import { badRequest, serverError, success } from '../../../../config/controllers/helpers/http-helpers'
import { CreatePostUseCaseInterface } from '../../usecases/interfaces'

export class CreatePostController implements HttpController {
  constructor (
    private readonly postUseCases: CreatePostUseCaseInterface
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requestData = httpRequest.body

      const requiredFields = ['userEmail', 'picture', 'description', 'animal']
      for (const field of requiredFields) {
        if (!requestData[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      const result = await this.postUseCases.create(requestData)
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
