import { FastifyReply, FastifyRequest } from 'fastify'

import { PrismaDriverLicenseRepository } from '@/repositories/prisma/prisma-cnh-repository'
import { RegisterDriverLicenseUseCase } from '@/use-cases/cnh/register'
import {
    cnhUserIdParamSchema,
    registerCnhSchema,
} from '@/schema/cnh/cnh-schemas'

export async function registerDriverLicenseController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaDriverLicenseRepository = new PrismaDriverLicenseRepository()
    const cnhRegisterUseCase = new RegisterDriverLicenseUseCase(
        prismaDriverLicenseRepository,
    )

    const { userId } = cnhUserIdParamSchema.parse(request.params)

    const { category, licenseNumber, points, validity } =
        registerCnhSchema.parse(request.body)

    try {
        const driverLicense = await cnhRegisterUseCase.execute({
            category,
            licenseNumber,
            points,
            userId,
            validity,
        })

        return reply.status(201).send(driverLicense)
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(400).send({ message: error.message })
        }

        return reply
            .status(500)
            .send({ message: 'Internal Server Error', error })
    }
}
