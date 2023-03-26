import { Uuid } from '../types'

export type UserTypeOptions = 'PERSON' | 'ONG'

export class User {
  id: Uuid
  type: UserTypeOptions
  name: string
  email: string
  nickname: string
  phone_number: string
  password: string
  donation_link?: string
  document?: string
  created_at: Date
  disabled_at?: Date
}
