import { UserDTO } from '../models'

export interface UserRepository {
  add(user: UserDTO): Promise<boolean>
  findUser(email: string): Promise<UserDTO>
}
