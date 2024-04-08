import { FastifyReply, FastifyRequest } from 'fastify'

import { FindLicenseByUserIdUseCase } from '@/use-cases/cnh/find-by-userId'
import { PrismaDriverLicenseRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { cnhUserIdParamSchema } from '@/schema/cnh/cnh-schemas'

export async function findDriverLicenseByUserIdController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaDriverLicenseRepository = new PrismaDriverLicenseRepository()
    const findDriverLicenseByUserIdUseCase = new FindLicenseByUserIdUseCase(
        prismaDriverLicenseRepository,
    )

    const { userId } = cnhUserIdParamSchema.parse(request.params)

    try {
        const driverLicenses = await findDriverLicenseByUserIdUseCase.execute({
            userId,
        })

        return reply.status(200).send(driverLicenses)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
