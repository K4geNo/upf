import { PrismaInfractionsRepository } from '@/repositories/prisma/prisma-infractions-repository'
import {
    registerInfractionBodySchema,
    registerInfractionParamsSchema,
} from '@/schema/infractions/infractions-schema'
import { RegisterInfractionUseCase } from '@/use-cases/infractions/register'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function registerInfractionController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaInfractionRepository = new PrismaInfractionsRepository()
    const registerInfractionUseCase = new RegisterInfractionUseCase(
        prismaInfractionRepository,
    )

    const { userId, vehicleId } = registerInfractionParamsSchema.parse(
        request.params,
    )

    const { date, points, value } = registerInfractionBodySchema.parse(
        request.body,
    )

    try {
        await registerInfractionUseCase.execute({
            date,
            points,
            value,
            userId,
            vehicleId,
        })

        reply.status(201).send()
    } catch (error) {
        if (error instanceof Error) {
            reply.status(400).send({ message: error.message })
        }

        reply.status(500).send({ message: 'Internal server error' })
    }
}
