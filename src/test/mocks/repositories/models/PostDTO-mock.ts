import { PostDTO } from '../../../../hipet/repositories/models'

export const PostDTOmock = (): PostDTO => {
  const postDTO = new PostDTO()
  postDTO._id = 'any_id'
  postDTO.text = 'any_post_text'
  postDTO.title = 'any_title'
  postDTO.userNickname = 'any_user_nickname'
  return postDTO
}
