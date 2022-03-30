import { UserDTO } from '../models'

export interface UserRepository {
  add(user: UserDTO): Promise<UserDTO>
  findUser(email: string ): Promise<UserDTO>
}