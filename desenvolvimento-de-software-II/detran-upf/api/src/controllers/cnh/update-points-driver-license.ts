import { PrismaDriverLicenseRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { PrismaInfractionsRepository } from '@/repositories/prisma/prisma-infractions-repository'
import { updatePointsDriverLicenseParamsSchema } from '@/schema/cnh/cnh-schemas'
import { UpdatePointsDriverLicenseUseCase } from '@/use-cases/cnh/update-points-driver-license'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function updatePointsDriverLicenseController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaDriverLicenseRepository = new PrismaDriverLicenseRepository()
    const prismaInfractionsRepository = new PrismaInfractionsRepository()
    const updatePointsDriverLicenseUseCase =
        new UpdatePointsDriverLicenseUseCase(
            prismaDriverLicenseRepository,
            prismaInfractionsRepository,
        )

    const { infractionId, userId } =
        updatePointsDriverLicenseParamsSchema.parse(request.params)

    try {
        await updatePointsDriverLicenseUseCase.execute({ infractionId, userId })

        return reply.code(204).send()
    } catch (error) {
        if (error instanceof Error) {
            return reply.code(404).send({ message: error.message })
        }

        return reply.code(500).send({ message: 'Internal Server Error' })
    }
}
