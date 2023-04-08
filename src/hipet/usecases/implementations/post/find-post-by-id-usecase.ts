import { PostDTO, ReportDTO, UserDTO } from '../../../repositories/models'
import { PostRepository, ReportRepository, UserRepository } from '../../../repositories/interfaces'
import { FindPostByIdResult, FindPostByIdResultStatusOptions, FindPostByIdUseCaseInterface, FindPostByIdRequest } from '../../interfaces'
import { Post, User, Report } from '../../../schemata/entities'
import { generate_share_url } from '../../../logic'
import { CryptographService } from '../../../services/interfaces'

type Dependencies = {
  postRepository: PostRepository
  userRepository: UserRepository
  reportRepository: ReportRepository
  crytographService: CryptographService
}

export class FindPostByIdUseCase implements FindPostByIdUseCaseInterface {
  private readonly postRepository: PostRepository
  private readonly userRepository: UserRepository
  private readonly reportRepository: ReportRepository
  private readonly crytographService: CryptographService

  constructor (dependencies: Dependencies) {
    this.postRepository = dependencies.postRepository
    this.userRepository = dependencies.userRepository
    this.reportRepository = dependencies.reportRepository
    this.crytographService = dependencies.crytographService
  }

  private to_report (reportDTO: ReportDTO): Report {
    const report = new Report()
    report.id = reportDTO._id
    report.post_id = reportDTO.post_id
    report.created_at = reportDTO.created_at
    if (reportDTO.description) report.description = reportDTO.description

    return report
  }

  private to_user (userDTO: UserDTO): User {
    const user = new User()
    user.id = userDTO._id
    user.type = userDTO.type
    user.name = userDTO.name
    user.email = userDTO.email
    user.nickname = userDTO.nickname
    user.phone_number = userDTO.phone_number
    user.password = this.crytographService.decrypt(userDTO.password)
    user.created_at = userDTO.created_at
    if (userDTO.document) user.document = this.crytographService.decrypt(userDTO.document)
    if (userDTO.donation_link) user.donation_link = userDTO.donation_link

    return user
  }

  private to_post (postDTO: PostDTO, userDTO: UserDTO, reportList: ReportDTO[]): Post {
    const post = new Post()
    post.id = postDTO._id
    post.user = this.to_user(userDTO)
    post.animal = postDTO.animal
    post.state = postDTO.state
    if (postDTO.picture) post.picture = postDTO.picture
    post.description = postDTO.description
    post.created_at = new Date()
    post.reports = reportList.map(reportDto => this.to_report(reportDto))
    post.share_url = generate_share_url(postDTO._id)
    return post
  }

  async find (reportRequest: FindPostByIdRequest): Promise<FindPostByIdResult> {
    const post = await this.postRepository.findPostBy('_id', reportRequest.id)
    if (!post) {
      return {
        status: FindPostByIdResultStatusOptions.post_not_found
      }
    }

    const user = await this.userRepository.findUserBy('_id', post.customer_id)
    if (!user) {
      return {
        status: FindPostByIdResultStatusOptions.repository_error
      }
    }

    const reportList = await this.reportRepository.listByPost(post._id)

    return {
      status: FindPostByIdResultStatusOptions.success,
      post: this.to_post(post, user, reportList)
    }
  }
}
