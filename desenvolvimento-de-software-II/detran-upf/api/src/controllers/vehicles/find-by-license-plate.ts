import { PrismaVehicleRepository } from '@/repositories/prisma/prisma-vehicle-repository'
import { findByLicensePlateParamsSchema } from '@/schema/vehicle/vehicle-schema'
import { FindByLicensePlateUseCase } from '@/use-cases/vehicles/find-by-license-plate'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findByLicensePlateController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaVehicleRepository = new PrismaVehicleRepository()
    const findByLicensePlateUseCase = new FindByLicensePlateUseCase(
        prismaVehicleRepository,
    )

    const { licensePlate } = findByLicensePlateParamsSchema.parse(
        request.params,
    )

    try {
        const vehicle = await findByLicensePlateUseCase.execute({
            licensePlate,
        })

        return reply.status(200).send(vehicle)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal server error' })
    }
}
