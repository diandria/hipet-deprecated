import { UserDTO } from '../../../repositories/models'
import { UserRepository } from '../../../repositories/interfaces'
import { DisableUserResult, DisableUserResultStatusOptions, DisableUserUseCaseInterface, DisableUserRequest } from '../../interfaces/user'

type Dependencies = {
  userRepository: UserRepository
}

export class DisableUserUseCase implements DisableUserUseCaseInterface {
  private readonly userRepository: UserRepository

  constructor (dependencies: Dependencies) {
    this.userRepository = dependencies.userRepository
  }

  async disable (userRequest: DisableUserRequest): Promise<DisableUserResult> {
    const userDTO = new UserDTO()

    userDTO.disabled_at = new Date()

    const updatedUser = await this.userRepository.updateBy('_id', userRequest.id, userDTO)
    if (!updatedUser) {
      return {
        status: DisableUserResultStatusOptions.user_not_found
      }
    }

    return {
      status: DisableUserResultStatusOptions.success
    }
  }
}
