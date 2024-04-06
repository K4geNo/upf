import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaVehicleRepository } from '@/repositories/prisma/prisma-vehicle-repository'
import { RegisterVehicleUseCase } from '@/use-cases/vehicles/register'
import { registerVehicleSchema } from '@/schema/vehicle/vehicle-schema'

export async function RegisterVehicleController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaVehicleRepository = new PrismaVehicleRepository()
    const vehicleRegisterUseCase = new RegisterVehicleUseCase(
        prismaVehicleRepository,
    )

    const {
        anoFabricacao,
        cor,
        ipvaQuitado,
        ipvaValor,
        marca,
        modelo,
        placa,
        tipo,
    } = registerVehicleSchema.parse(request.body)

    try {
        const vehicle = await vehicleRegisterUseCase.execute({
            anoFabricacao,
            cor,
            ipvaQuitado,
            ipvaValor,
            marca,
            modelo,
            placa,
            tipo,
        })

        return reply.status(201).send(vehicle)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal server error' })
    }
}
