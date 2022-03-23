import { ApresentationUseCasesInterface } from '../interfaces'

export class ApresentationUseCases implements ApresentationUseCasesInterface {
  getVersion (): any {
    return {
      status: 'SUCCESS',
      version: '0.0.0',
      description: 'API para o sistema HIPET'
    }
  }
}
