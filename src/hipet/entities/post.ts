import { Animal } from './animal'
import { Report } from './report'
import { User } from './user'

export class Post {
  user: User
  address?: string
  picture: string
  description: string
  animal: Animal
  reports: Report[]
  createdAt: Date
}
