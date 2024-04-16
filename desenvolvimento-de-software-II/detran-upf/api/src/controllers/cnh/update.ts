import { FastifyReply, FastifyRequest } from 'fastify'
import {
    driverLicenseIdParamSchema,
    updateCnhSchema,
} from '@/schema/cnh/cnh-schemas'

import { PrismaDriverLicenseRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { UpdateDriverLicenseUseCase } from '@/use-cases/cnh/update'

export async function updateDriverLicenseController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaDriverLicenseRepository = new PrismaDriverLicenseRepository()
    const updateDriverLicenseUseCase = new UpdateDriverLicenseUseCase(
        prismaDriverLicenseRepository,
    )

    const { driverLicenseId } = driverLicenseIdParamSchema.parse(request.params)

    const { category, points, validity } = updateCnhSchema.parse(request.body)

    try {
        const driverLicense = await updateDriverLicenseUseCase.execute({
            data: {
                category,
                points,
                validity,
            },
            driverLicenseId,
        })

        return reply.status(200).send(driverLicense)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message })
        }

        return reply
            .status(500)
            .send({ message: 'Internal Server Error', error })
    }
}
