import { PrismaInfractionsRepository } from '@/repositories/prisma/prisma-infractions-repository'
import { findInfractionByIdParamsSchema } from '@/schema/infractions/infractions-schema'
import { FindByIdUseCase } from '@/use-cases/infractions/findById'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findInfractionByIdController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaInfractionsRepository = new PrismaInfractionsRepository()
    const findInfractionByIdUseCase = new FindByIdUseCase(
        prismaInfractionsRepository,
    )

    const { id } = findInfractionByIdParamsSchema.parse(request.params)

    try {
        const infraction = await findInfractionByIdUseCase.execute({ id })

        return reply.code(200).send(infraction)
    } catch (error) {
        if (error instanceof Error) {
            return reply.code(404).send({ message: error.message })
        }

        return reply.code(500).send({ message: 'Internal Server Error' })
    }
}
