import { PrismaIpvaRepository } from '@/repositories/prisma/prisma-ipva-repository'
import { ipvaVehicleIdParamSchema } from '@/schema/ipva/ipva-schemas'
import { FindIpvaByVehicleIdUseCase } from '@/use-cases/ipva/find-by-vehicleId'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function findIpvaByVehicleIdController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaIpvaRepository = new PrismaIpvaRepository()
    const findIpvaByVehicleIdUseCase = new FindIpvaByVehicleIdUseCase(
        prismaIpvaRepository,
    )
    const { vehicleId } = ipvaVehicleIdParamSchema.parse(request.params)

    try {
        const ipva = await findIpvaByVehicleIdUseCase.execute({ vehicleId })

        return reply.status(200).send(ipva)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
