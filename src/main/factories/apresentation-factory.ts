import { VersionController } from '../../hipet/controllers'
import { ApresentationUseCases } from '../../usecases/implementations'

export const makeVersionController = (): VersionController => {
  const apresentationUseCases = new ApresentationUseCases()

  return new VersionController(apresentationUseCases)
}
