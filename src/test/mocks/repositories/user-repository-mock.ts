import { UserRepository } from '../../../hipet/repositories/interfaces'
import { UserDTO } from '../../../hipet/repositories/models'
import { UserDTOmock } from './models'

export class UserRepositoryStub implements UserRepository {
  async add (user: UserDTO): Promise<boolean> {
    return true
  }

  async findUser (email: string): Promise<UserDTO> {
    return UserDTOmock()
  }
}
