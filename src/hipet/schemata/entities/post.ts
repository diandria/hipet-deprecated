import { Animal } from './animal'
import { Report } from './report'
import { User } from './user'
import { Uuid } from '../types'

export type StateOptions = 'AC' | 'AL' | 'AP' | 'AM' | 'BA' | 'CE' | 'DF' | 'ES' | 'GO' | 'MA' | 'MT' | 'MS' | 'MG' | 'PA' | 'PB' | 'PR' | 'PE' | 'PI' | 'RJ' | 'RN' | 'RS' | 'RO' | 'RR' | 'SC' | 'SP' | 'SE' | 'TO'

export class Post {
  id: Uuid
  user: User
  animal: Animal
  state: StateOptions
  picture?: string
  description: string
  created_at: Date
  reports: Report[]
  share_url: string
  deleted_at?: Date
}
