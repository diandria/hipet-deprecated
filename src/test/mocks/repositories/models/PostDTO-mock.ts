import { PostDTO } from '../../../../hipet/repositories/models'
import { mockAnimal, mockUser } from '../../entity'

export const mockPostDTO = (): PostDTO => {
  const postDTO = new PostDTO()
  postDTO._id = 'any_id'
  postDTO.user = mockUser
  postDTO.picture = 'any_url.com.br'
  postDTO.description = 'any_description'
  postDTO.animal = mockAnimal()
  postDTO.reports = []
  postDTO.createdAt = new Date('2022')
  postDTO.address = 'any_address'
  return postDTO
}
