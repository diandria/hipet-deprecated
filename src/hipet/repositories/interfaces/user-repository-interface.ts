import { UserDTO } from '../models'

export interface UserRepository {
  add(user: UserDTO): Promise<boolean>
  findUserBy(field: string, value: any): Promise<UserDTO>
}
