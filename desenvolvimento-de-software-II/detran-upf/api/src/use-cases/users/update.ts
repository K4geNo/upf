/* eslint-disable no-useless-constructor */
import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../../repositories/users-repository'

interface UpdateUserUseCaseDTO {
    userId: string
    data: Prisma.UserUncheckedUpdateInput
}

interface UpdateUserUseCaseResponse {
    user: User
}

export class UpdateUserUseCase {
    constructor(private readonly usersRepository: UsersRepository) {}

    async execute({
        userId,
        data,
    }: UpdateUserUseCaseDTO): Promise<UpdateUserUseCaseResponse> {
        const user = await this.usersRepository.findUserById(userId)

        if (!user) {
            throw new Error('User not found.')
        }

        const updatedUser = await this.usersRepository.update(data, userId)

        return { user: updatedUser }
    }
}
