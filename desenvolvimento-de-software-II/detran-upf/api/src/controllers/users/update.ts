import { FastifyReply, FastifyRequest } from 'fastify'
import {
    updateUserBodySchema,
    updateUserParamsSchema,
} from '../../schema/users/update-schema'

import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { UpdateUserUseCase } from '../../use-cases/users/update'

export async function updateUserController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaUsersRepository = new PrismaUsersRepository()
    const userUpdateUseCase = new UpdateUserUseCase(prismaUsersRepository)

    const { addressDescription, birthDate, email, pcd, personName, phone } =
        updateUserBodySchema.parse(request.body)
    const { userId } = updateUserParamsSchema.parse(request.params)

    try {
        const user = await userUpdateUseCase.execute({
            data: {
                birthDate,
                addressDescription,
                email,
                personName,
                pcd,
                phone,
            },
            userId,
        })

        return reply.status(200).send(user)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
