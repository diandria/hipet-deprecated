import { UserDTO } from '../models'

export interface UserRepository {
  add(user: UserDTO): Promise<UserDTO>
}
