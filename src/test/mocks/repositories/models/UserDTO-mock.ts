import { UserDTO } from '../../../../hipet/repositories/models'

export const UserDTOmock = (): UserDTO => {
  const userDTO = new UserDTO()
  userDTO._id = 'any_id'
  userDTO.document = '123.456.789-00'
  userDTO.email = 'any_email@mail.com'
  userDTO.name = 'any_name'
  userDTO.nickName = 'any_nickname'
  userDTO.password = 'any_password'
  userDTO.phoneNumber = '(00) 1234-5678'

  return userDTO
}
