import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaCnhRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { RegisterCnhUseCase } from '@/use-cases/cnh/register'
import { registerCnhSchema } from '@/schema/cnh/register-cnh-schema'

export async function registerCnhController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaCnhRepository = new PrismaCnhRepository()
    const cnhRegisterUseCase = new RegisterCnhUseCase(prismaCnhRepository)

    const { categoria, numero, pontos, userId, validade } =
        registerCnhSchema.parse(request.body)

    try {
        const cnh = await cnhRegisterUseCase.execute({
            categoria,
            numero,
            pontos,
            userId,
            validade,
        })

        return reply.status(201).send(cnh)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message })
        }

        throw error
    }
}
