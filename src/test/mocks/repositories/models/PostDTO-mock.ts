import { PostDTO } from '../../../../hipet/repositories/models'
import { mockAnimal, mockUser } from '../../entity'

export const mockPost = (): PostDTO => {
  const postDTO = new PostDTO()
  postDTO._id = 'any_id'
  postDTO.user = mockUser
  postDTO.picture = 'any_url.com.br'
  postDTO.description = 'any_description'
  postDTO.animal = mockAnimal()
  postDTO.reports = []
  postDTO.createdAt = new Date()
  return postDTO
}
