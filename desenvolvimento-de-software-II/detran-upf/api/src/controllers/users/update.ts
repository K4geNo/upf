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

    const {
        dataNascimento,
        descricaoEndereco,
        email,
        nomePessoa,
        pcd,
        telefone,
    } = updateUserBodySchema.parse(request.body)
    const { userId } = updateUserParamsSchema.parse(request.params)
    console.log('userId', userId)
    console.log(request.body)

    const user = await userUpdateUseCase.execute({
        data: {
            data_nascimento: dataNascimento,
            descricao_endereco: descricaoEndereco,
            email,
            nome_pessoa: nomePessoa,
            pcd,
            telefone,
        },
        userId,
    })

    return reply.status(200).send(user)
}
