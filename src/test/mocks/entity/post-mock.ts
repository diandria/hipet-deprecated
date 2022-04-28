import { Post } from '../../../hipet/entities'
import { mockAnimal } from './animal-mock'
import { mockUser } from './user-mock'

export const mockPost = (): Post => {
  const post = new Post()
  post.user = mockUser
  post.picture = 'any_url.com.br'
  post.description = 'any_description'
  post.animal = mockAnimal()
  post.reports = []
  post.createdAt = new Date()
  return post
}
