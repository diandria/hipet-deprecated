import { Router } from 'express'
import { makeCreateReportController } from '../../factories'
import { adaptRoute } from '../../../../config/web/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/report/create', adaptRoute(makeCreateReportController()))
}
