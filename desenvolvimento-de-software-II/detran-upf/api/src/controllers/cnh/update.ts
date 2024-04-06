import { FastifyReply, FastifyRequest } from 'fastify'
import { cnhNumberParamSchema, updateCnhSchema } from '@/schema/cnh/cnh-schemas'

import { PrismaCnhRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { UpdateCnhUseCase } from '@/use-cases/cnh/update'

export function updateCnhController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaCnhRepository = new PrismaCnhRepository()
    const updateCnhUseCase = new UpdateCnhUseCase(prismaCnhRepository)

    const { number } = cnhNumberParamSchema.parse(request.params)

    const { categoria, numero, pontos, validade } = updateCnhSchema.parse(
        request.body,
    )

    try {
        const cnh = updateCnhUseCase.execute({
            data: {
                categoria,
                numero,
                pontos,
                validade,
            },
            cnhNumber: number,
        })

        return reply.status(200).send(cnh)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
