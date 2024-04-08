import { PrismaInfractionsRepository } from '@/repositories/prisma/prisma-infractions-repository'
import { findInfractionByIdParamsSchema } from '@/schema/infractions/infractions-schema'
import { DeleteInfractionUseCase } from '@/use-cases/infractions/delete'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteInfractionController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaInfractionsRepository = new PrismaInfractionsRepository()
    const deleteInfractionUseCase = new DeleteInfractionUseCase(
        prismaInfractionsRepository,
    )

    const { id } = findInfractionByIdParamsSchema.parse(request.params)

    try {
        await deleteInfractionUseCase.execute({ id })

        return reply.code(204).send()
    } catch (error) {
        if (error instanceof Error) {
            return reply.code(404).send({ message: error.message })
        }

        return reply.code(500).send({ message: 'Internal Server Error' })
    }
}
