import { Router } from 'express'
import { makeCreateUserController, makeFindUserByIdController, makeFindUserByNicknameController, makeUpdateUserController, makeDisableUserController, makeLoginUserController } from '../../factories'
import { adaptRoute } from '../../../../config/web/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/user/create', adaptRoute(makeCreateUserController()))
  router.get('/user/find-by-id/:id', adaptRoute(makeFindUserByIdController()))
  router.get('/user/find-by-nickname/:nickname', adaptRoute(makeFindUserByNicknameController()))
  router.put('/user/update/:id', adaptRoute(makeUpdateUserController()))
  router.put('/user/disable/:id', adaptRoute(makeDisableUserController()))
  router.post('/user/login', adaptRoute(makeLoginUserController()))
}
