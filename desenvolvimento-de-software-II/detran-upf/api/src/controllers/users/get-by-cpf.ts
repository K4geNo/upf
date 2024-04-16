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

    try {
        const user = await getUserByCpf.execute({
            cpf,
        })

        return reply.status(200).send(user)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply
            .status(500)
            .send({ message: 'Internal Server Error', error })
    }
}
