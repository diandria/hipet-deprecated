import { CreateReportController, DeleteReportController, FindReportByIdController } from '../../hipet/controllers'
import { MongoPostRepository, MongoReportRepository } from '../../hipet/repositories/implementations'
import { NodeUuidService } from '../../hipet/services/implementations/node-uuid-service'
import { CreateReportUseCase, DeleteReportUseCase, FindReportByIdUseCase } from '../../hipet/usecases/implementations'

export const makeCreateReportController = (): CreateReportController => {
  const uuidService = new NodeUuidService()
  const reportRepository = new MongoReportRepository({ uuidService })
  const postRepository = new MongoPostRepository({ uuidService })
  const reportUseCases = new CreateReportUseCase({ reportRepository, postRepository })

  return new CreateReportController(reportUseCases)
}

export const makeFindReportByIdController = (): FindReportByIdController => {
  const uuidService = new NodeUuidService()
  const reportRepository = new MongoReportRepository({ uuidService })
  const reportUseCases = new FindReportByIdUseCase({ reportRepository })

  return new FindReportByIdController(reportUseCases)
}

export const makeDeleteReportController = (): DeleteReportController => {
  const uuidService = new NodeUuidService()
  const reportRepository = new MongoReportRepository({ uuidService })
  const reportUseCases = new DeleteReportUseCase({ reportRepository })

  return new DeleteReportController(reportUseCases)
}
