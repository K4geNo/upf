import { PrismaInfractionsRepository } from '@/repositories/prisma/prisma-infractions-repository'
import { FindAllInfractionUseCase } from '@/use-cases/infractions/findAll'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findAllInfractionsController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaInfractionsRepository = new PrismaInfractionsRepository()
    const findAllInfractionUseCase = new FindAllInfractionUseCase(
        prismaInfractionsRepository,
    )

    const infraction = await findAllInfractionUseCase.execute()

    return reply.code(200).send(infraction)
}
