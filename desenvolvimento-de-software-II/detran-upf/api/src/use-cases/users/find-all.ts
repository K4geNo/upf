import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'

interface FindAllResponseDTO {
    users: User[]
}

export class FindAllUsersUseCase {
    constructor(private usersRepository: UsersRepository) {
        Object.freeze(this.usersRepository)
    }

    async execute(): Promise<FindAllResponseDTO> {
        const users = await this.usersRepository.findAll()

        return { users }
    }
}
