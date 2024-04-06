import { FastifyReply, FastifyRequest } from 'fastify'

import { FindCnhByUserIdUseCase } from '@/use-cases/cnh/find-cnh-by-userId'
import { PrismaCnhRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { cnhUserIdParamSchema } from '@/schema/cnh/cnh-schemas'

export async function findCnhByUserIdController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaCnhRepository = new PrismaCnhRepository()
    const findCnhByUserIdUseCase = new FindCnhByUserIdUseCase(
        prismaCnhRepository,
    )

    const { userId } = cnhUserIdParamSchema.parse(request.params)

    try {
        const cnhs = await findCnhByUserIdUseCase.execute(userId)

        return reply.status(200).send(cnhs)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
