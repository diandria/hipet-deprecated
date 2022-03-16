import { VersionController } from '../../../controllers/implementations'
import { VersionUseCase } from '../../../usecases/implementations'

export const makeVersionController = (): VersionController => {
  const versionUseCase = new VersionUseCase()

  return new VersionController(versionUseCase)
}
