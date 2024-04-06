import { FastifyReply, FastifyRequest } from 'fastify'

import { FindCnhByNumberUseCase } from '@/use-cases/cnh/find-cnh-by-number'
import { PrismaCnhRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { cnhNumberParamSchema } from '@/schema/cnh/cnh-schemas'

export async function findCnhByNumberController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaCnhRepository = new PrismaCnhRepository()
    const findCnhByNumberUseCase = new FindCnhByNumberUseCase(
        prismaCnhRepository,
    )

    const { number } = cnhNumberParamSchema.parse(request.params)

    try {
        const cnhs = await findCnhByNumberUseCase.execute(number)

        return reply.status(200).send(cnhs)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
