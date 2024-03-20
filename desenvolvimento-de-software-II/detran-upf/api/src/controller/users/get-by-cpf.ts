import { FastifyReply, FastifyRequest } from 'fastify'

import { GetUserByCpfUseCase } from '../../use-cases/users/get-user-by-cpf'
import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { getByCpfSchema } from '../../schema/users/get-by-cpf-schema'

export async function getByCpfController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaUsersRepository = new PrismaUsersRepository()
    const getUserByCpf = new GetUserByCpfUseCase(prismaUsersRepository)

    const { cpf } = getByCpfSchema.parse(request.params)

    const user = await getUserByCpf.execute({
        cpf,
    })

    if (!user) {
        return reply.code(404).send({ message: 'User not found.' })
    }

    return reply.code(200).send(user)
}
