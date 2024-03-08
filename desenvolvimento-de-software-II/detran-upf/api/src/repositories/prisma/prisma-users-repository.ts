import { Prisma, User } from '@prisma/client'

import { UsersRepository } from '../users-repository'
import prisma from '../../lib/prisma'

export class PrismaUsersRepository implements UsersRepository {
    async create(data: Prisma.UserCreateInput): Promise<User> {
        const user = await prisma.user.create({ data })

        return user
    }

    async update(
        data: Prisma.UserUncheckedUpdateInput,
        userId: string,
    ): Promise<User> {
        const user = await prisma.user.update({
            where: {
                id: userId,
            },
            data,
        })

        return user
    }

    async findUserById(id: string): Promise<User | null> {
        const user = await prisma.user.findUniqueOrThrow({
            where: { id },
        })

        return user
    }

    async findUserByCpf(cpf: string): Promise<User | null> {
        const user = await prisma.user.findUniqueOrThrow({
            where: { cpf },
        })

        return user
    }
}
