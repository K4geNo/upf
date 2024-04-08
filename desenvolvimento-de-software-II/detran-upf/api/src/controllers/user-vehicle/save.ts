import { PrismaUserVehicleRepository } from '@/repositories/prisma/prisma-user-vehicle-repository'
import { AddVehicleToUserUseCase } from '@/use-cases/user-vehicle/save'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function addVehicleToUserController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaUserVehicleRepository = new PrismaUserVehicleRepository()
    const addVehicleToUserUseCase = new AddVehicleToUserUseCase(
        prismaUserVehicleRepository,
    )

    const { userId, vehicleId } = request.params as {
        userId: string
        vehicleId: string
    }

    try {
        await addVehicleToUserUseCase.execute({ userId, vehicleId })

        reply.code(201).send()
    } catch (error) {
        if (error instanceof Error) {
            return reply.code(400).send({ message: error.message })
        }

        return reply.code(500).send({ message: 'Internal server error' })
    }
}
