import { CreateReportController } from '../../hipet/controllers'
import { MongoPostRepository, MongoReportRepository } from '../../hipet/repositories/implementations'
import { NodeUuidService } from '../../hipet/services/implementations/node-uuid-service'
import { CreateReportUseCase } from '../../hipet/usecases/implementations'

export const makeCreateReportController = (): CreateReportController => {
  const uuidService = new NodeUuidService()
  const reportRepository = new MongoReportRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportUseCases = new CreateReportUseCase({ reportRepository, postRepository })

  return new CreateReportController(reportUseCases)
}
