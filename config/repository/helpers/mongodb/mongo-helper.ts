import { MongoClient, Collection } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client?.isConnected()) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id })
  },

  async addBy (object: any, collectionName: string): Promise<boolean> {
    const accountCollection = await MongoHelper.getCollection(collectionName)
    await accountCollection.insertOne(object)
    return true
  },

  async findBy (field: any, value: any, collectionName: string): Promise<any> {
    const collection = await MongoHelper.getCollection(collectionName)
    const result = await collection.findOne({ [field]: value })
    return result
  },

  async list (collectionName: string, limitNumber: number = 0): Promise<any> {
    const collection = await MongoHelper.getCollection(collectionName)
    const result = await collection.find({}).limit(limitNumber).toArray()
    return result
  }
}
