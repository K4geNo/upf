import { PrismaIpvaRepository } from '@/repositories/prisma/prisma-ipva-repository'
import {
    ipvaBodySchema,
    ipvaVehicleIdParamSchema,
} from '@/schema/ipva/ipva-schemas'
import { RegisterIpvaUseCase } from '@/use-cases/ipva/register'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function RegisterIpvaController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaIpvaRepository = new PrismaIpvaRepository()
    const registerIpvaUseCase = new RegisterIpvaUseCase(prismaIpvaRepository)

    const { vehicleId } = ipvaVehicleIdParamSchema.parse(request.params)
    const { currentYear, paymentDate, value } = ipvaBodySchema.parse(
        request.body,
    )

    try {
        await registerIpvaUseCase.execute({
            currentYear,
            paymentDate,
            value,
            vehicleId,
        })

        reply.code(201).send()
    } catch (error) {
        if (error instanceof Error) {
            return reply.code(400).send({ message: error.message })
        }

        return reply.code(500).send({ message: error })
    }
}
