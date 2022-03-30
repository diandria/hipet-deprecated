import { Router } from 'express'
import { makeCreateUserController, makeLoginUserController } from '../../factories'
import { adaptRoute } from '../../../../config/web/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/user/create', adaptRoute(makeCreateUserController()))
  router.post('/user/login', adaptRoute(makeLoginUserController()))
}
