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
}
