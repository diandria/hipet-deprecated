import { Router } from 'express'
import { makeCreatePostController, makeFindPostByIdController, makeListAllPostController, makeListPostByUserController } from '../../factories'
import { adaptRoute } from '../../../../config/web/adapters/express-route-adapter'

export default (router: Router): void => {
  router.post('/post/create', adaptRoute(makeCreatePostController()))
  router.get('/post/find-by-id/:id', adaptRoute(makeFindPostByIdController()))
  router.get('/post/list-all', adaptRoute(makeListAllPostController()))
  router.get('/post/list-by-user/:customer_id', adaptRoute(makeListPostByUserController()))
}
