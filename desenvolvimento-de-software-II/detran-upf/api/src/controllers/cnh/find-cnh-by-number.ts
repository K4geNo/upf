import { FastifyReply, FastifyRequest } from 'fastify'

import { FindByLicenseNumberUseCase } from '@/use-cases/cnh/find-by-license-number'
import { PrismaDriverLicenseRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { driverLicenseNumberParamSchema } from '@/schema/cnh/cnh-schemas'

export async function findByLicenseNumberController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaDriverLicenseRepository = new PrismaDriverLicenseRepository()
    const findCnhByNumberUseCase = new FindByLicenseNumberUseCase(
        prismaDriverLicenseRepository,
    )

    const { licenseNumber } = driverLicenseNumberParamSchema.parse(
        request.params,
    )

    try {
        const cnhs = await findCnhByNumberUseCase.execute({
            licenseNumber,
        })

        return reply.status(200).send(cnhs)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
