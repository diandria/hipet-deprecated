import { UserRepository } from '../../../hipet/repositories/interfaces'
import { UserDTO } from '../../../hipet/repositories/models'
import { UserDTOmock } from './models'

export class UserRepositoryStub implements UserRepository {
  async add (user: UserDTO): Promise<boolean> {
    return true
  }

  async findUserBy (field: string, value: any): Promise<UserDTO> {
    return UserDTOmock()
  }
}
