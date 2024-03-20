import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'

interface GetUserByIdUseCaseRequestDTO {
    cpf: string
}

interface GetUserByIdUseCaseResponseDTO {
    user: User
}

export class GetUserByCpfUseCase {
    constructor(private readonly userRepository: UsersRepository) {
        Object.freeze(this.userRepository)
    }

    async execute({
        cpf,
    }: GetUserByIdUseCaseRequestDTO): Promise<GetUserByIdUseCaseResponseDTO> {
        const user = await this.userRepository.findUserByCpf(cpf)

        if (!user) {
            throw new Error('User not found.')
        }

        return {
            user,
        }
    }
}
