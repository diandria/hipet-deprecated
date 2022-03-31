import { UserDTO } from '../models'

export interface UserRepository {
  add(user: UserDTO): Promise<boolean>
  findUserByEmail(email: string): Promise<UserDTO>
}
