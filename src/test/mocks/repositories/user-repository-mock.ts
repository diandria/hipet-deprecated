import { User } from '../../../hipet/entities'
import { UserRepository } from '../../../hipet/repositories/interfaces'
import { makeUserMock } from '../entities/user-mock'

export class UserRepositoryStub implements UserRepository {
  async add (user: User): Promise<any> {
    return makeUserMock()
  }
}
