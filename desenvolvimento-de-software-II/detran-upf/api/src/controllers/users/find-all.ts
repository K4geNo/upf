import { FastifyReply, FastifyRequest } from 'fastify'

import { FindAllUsersUseCase } from '../../use-cases/users/find-all'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'

export async function findAllController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaUsersRepository = new PrismaUsersRepository()
    const findAllUsersUseCase = new FindAllUsersUseCase(prismaUsersRepository)

    const users = await findAllUsersUseCase.execute()

    return reply.status(200).send(users)
}
