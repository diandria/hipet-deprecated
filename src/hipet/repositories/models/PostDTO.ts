import { Uuid } from '../../schemata/types'
import { Animal, StateOptions } from '../../schemata/entities'

export class PostDTO {
  _id: Uuid // chave unica
  user_id: Uuid
  animal: Animal
  state: StateOptions
  picture?: string
  description: string
  created_at: Date
  reports: Uuid[]
  share_url: string
  deleted_at?: Date
}
