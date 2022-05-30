import { Animal, Report, User } from '../../entities'

export class PostDTO {
  _id: string
  address?: string
  createdAt: Date
  user: User
  picture: string
  description: string
  animal: Animal
  reports: Report[]
}
