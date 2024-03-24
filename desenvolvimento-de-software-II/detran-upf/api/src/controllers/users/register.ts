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
        dataNascimento,
        descricaoEndereco,
        email,
        nomePessoa,
        pcd,
        telefone,
    } = registerUserSchema.parse(request.body)

    const user = await userRegisterUseCase.execute({
        cpf,
        dataNascimento,
        descricaoEndereco,
        email,
        nomePessoa,
        pcd,
        telefone,
    })

    return reply.status(201).send(user)
}
