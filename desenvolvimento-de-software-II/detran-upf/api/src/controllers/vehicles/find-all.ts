import { PrismaVehicleRepository } from '@/repositories/prisma/prisma-vehicle-repository'
import { FindAllVehiclesUseCase } from '@/use-cases/vehicles/find-all'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findAllVehiclesController(
    req: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaVehicleRepository = new PrismaVehicleRepository()
    const findAllVehiclesUseCase = new FindAllVehiclesUseCase(
        prismaVehicleRepository,
    )

    const vehicles = await findAllVehiclesUseCase.execute()

    return reply.status(200).send(vehicles)
}
