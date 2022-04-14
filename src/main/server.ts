import { MongoHelper } from '../../config/repository/helpers/mongodb/mongo-helper'
import env from './env'

MongoHelper.connect(env.mongodb.mongoUrl)
  .then(async () => {
    const app = (await import('../../config/web/config/app')).default
    app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`))
  })
  .catch(console.error)
