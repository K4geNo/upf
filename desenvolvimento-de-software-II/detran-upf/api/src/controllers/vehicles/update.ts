import { PrismaVehicleRepository } from '@/repositories/prisma/prisma-vehicle-repository'
import {
    findVehicleByVehicleIdParamsSchema,
    updateVehicleSchema,
} from '@/schema/vehicle/vehicle-schema'
import { UpdateVehicleUseCase } from '@/use-cases/vehicles/update'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function updateVehicleController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaVehicleRepository = new PrismaVehicleRepository()
    const updateVehicleUseCase = new UpdateVehicleUseCase(
        prismaVehicleRepository,
    )

    const { vehicleId } = findVehicleByVehicleIdParamsSchema.parse(
        request.params,
    )

    const {
        brand,
        color,
        ipvaPaid,
        ipvaValue,
        manufacturingYear,
        model,
        type,
    } = updateVehicleSchema.parse(request.body)

    const updatedVehicle = await updateVehicleUseCase.execute({
        data: {
            brand,
            color,
            ipvaPaid,
            ipvaValue,
            manufacturingYear,
            model,
            type,
        },
        vehicleId,
    })
    return reply.status(200).send(updatedVehicle)
}
