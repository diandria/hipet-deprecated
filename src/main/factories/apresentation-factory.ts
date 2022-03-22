import { VersionController } from '../../controllers'
import { ApresentationUseCases } from '../../usecases/implementations'

export const makeVersionController = (): VersionController => {
  const apresentationUseCases = new ApresentationUseCases()

  return new VersionController(apresentationUseCases)
}
