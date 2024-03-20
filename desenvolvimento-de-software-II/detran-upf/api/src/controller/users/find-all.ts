import { FastifyReply, FastifyRequest } from 'fastify'

import { FindAllUseCase } from '../../use-cases/users/find-all'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'

export async function findAllController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaUsersRepository = new PrismaUsersRepository()
    const findAll = new FindAllUseCase(prismaUsersRepository)

    const users = await findAll.execute()

    return reply.code(200).send(users)
}
