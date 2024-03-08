import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'

interface GetUserByIdUseCaseRequestDTO {
    userId: string
}

interface GetUserByIdUseCaseResponseDTO {
    user: User
}

export class GetUserByIdUseCase {
    constructor(private readonly userRepository: UsersRepository) {
        Object.freeze(this.userRepository)
    }

    async execute({
        userId,
    }: GetUserByIdUseCaseRequestDTO): Promise<GetUserByIdUseCaseResponseDTO> {
        const user = await this.userRepository.findUserById(userId)

        if (!user) {
            throw new Error('User not found.')
        }

        return {
            user,
        }
    }
}
