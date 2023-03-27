import { Router } from 'express'
import { makeCreateUserController, makeFindUserByIdController } from '../../factories'
import { adaptRoute } from '../../../../config/web/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/user/create', adaptRoute(makeCreateUserController()))
  router.get('/user/find-by-id/:id', adaptRoute(makeFindUserByIdController()))
}
