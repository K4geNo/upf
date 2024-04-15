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

    const { driverLicenseId } = cnhNumberParamSchema.parse(request.params)

    const { category, points, validity } = updateCnhSchema.parse(request.body)

    const driverLicense = updateDriverLicenseUseCase.execute({
        data: {
            category,
            points,
            validity,
        },
        driverLicenseId,
    })

    return reply.status(200).send(driverLicense)
}
