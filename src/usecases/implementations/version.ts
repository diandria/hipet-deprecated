import { VersionContract } from '../contracts'

export class VersionUseCase implements VersionContract {
  execute (): any {
    return {
      status: 'SUCCESS',
      version: '0.0.0',
      description: 'API para o sistema HIPET'
    }
  }
}
