import { FastifyReply, FastifyRequest } from 'fastify'
import { cnhNumberParamSchema, updateCnhSchema } from '@/schema/cnh/cnh-schemas'

import { PrismaDriverLicenseRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { UpdateDriverLicenseUseCase } from '@/use-cases/cnh/update'

export function updateDriverLicenseController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaDriverLicenseRepository = new PrismaDriverLicenseRepository()
    const updateDriverLicenseUseCase = new UpdateDriverLicenseUseCase(
        prismaDriverLicenseRepository,
    )

    const { licenseNumber } = cnhNumberParamSchema.parse(request.params)

    const { category, points, validity } = updateCnhSchema.parse(request.body)

    try {
        const driverLicense = updateDriverLicenseUseCase.execute({
            data: {
                category,
                points,
                validity,
            },
            licenseNumber,
        })

        return reply.status(200).send(driverLicense)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
