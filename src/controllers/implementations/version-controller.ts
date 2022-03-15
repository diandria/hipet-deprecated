import { VersionContract } from '../../usecases/contracts'
import { HttpController, HttpResponse } from '../contracts'
import { success, serverError } from '../helpers/http-helpers'

export class VersionController implements HttpController {
  constructor (
    private readonly versionUseCase: VersionContract
  ) { }

  async handle (): Promise<HttpResponse> {
    try {
      const result = this.versionUseCase.execute()
      return success(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
