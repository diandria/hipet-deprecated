import { User } from '../../../hipet/entities'

export const makeUserMock = (): User => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@mail.com',
  password: 'any_password_123',
  phoneNumber: '(00) 1234-5678'
})
