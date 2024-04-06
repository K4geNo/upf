import { FastifyReply, FastifyRequest } from 'fastify'

import { FindAllCnhUseCase } from '@/use-cases/cnh/find-all'
import { PrismaCnhRepository } from '@/repositories/prisma/prisma-cnh-repository'

export async function findAllCnhController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaCnhRepository = new PrismaCnhRepository()
    const findAllCnhUseCase = new FindAllCnhUseCase(prismaCnhRepository)

    const cnhs = await findAllCnhUseCase.execute()

    return reply.status(200).send(cnhs)
}
