import { Uuid } from '../../schemata/types'
import { UserTypeOptions } from '../../schemata/entities'

export class UserDTO {
  _id: Uuid // chave unica
  type: UserTypeOptions
  name: string
  email: string
  nickname: string // chave unica
  phone_number: string
  password: string
  donation_link?: string
  document?: string // chave unica
  created_at: Date
  disabled_at?: Date
}
