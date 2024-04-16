import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaUsersRepository } from '../../repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../../use-cases/users/register'
import { registerUserSchema } from '../../schema/users/register-schema'

export async function registerController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaUsersRepository = new PrismaUsersRepository()
    const userRegisterUseCase = new RegisterUseCase(prismaUsersRepository)

    const {
        cpf,
        addressDescription,
        birthDate,
        email,
        pcd,
        personName,
        phone,
    } = registerUserSchema.parse(request.body)

    try {
        const user = await userRegisterUseCase.execute({
            cpf,
            addressDescription,
            birthDate,
            email,
            personName,
            pcd,
            phone,
        })

        return reply.status(201).send(user)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message })
        }

        return reply
            .status(500)
            .send({ message: 'Internal Server Error', error })
    }
}
