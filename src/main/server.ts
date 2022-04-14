import { MongoHelper } from '../../config/repository/helpers/mongodb/mongo-helper'
import env from './env'

MongoHelper.connect(env.mongodb.mongoUrl)
  .then(async () => {
    const app = (await import('../../config/web/config/app')).default
    app.listen((process.env.PORT || env.app.port), () => console.log(`Server running at http://localhost:${(process.env.PORT || env.app.port)}`))
  })
  .catch(console.error)
