import { Router } from 'express'
import { makeCreatePostController } from '../../factories'
import { adaptRoute } from '../../../../config/web/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/post/create', adaptRoute(makeCreatePostController()))
}
