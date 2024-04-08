import { FastifyReply, FastifyRequest } from 'fastify'

import { FindAllDriverLicenseUseCase } from '@/use-cases/cnh/find-all'
import { PrismaDriverLicenseRepository } from '@/repositories/prisma/prisma-cnh-repository'

export async function findAllDriverLicenseController(
    request: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaDriverLicenseRepository = new PrismaDriverLicenseRepository()
    const findAllCnhUseCase = new FindAllDriverLicenseUseCase(
        prismaDriverLicenseRepository,
    )

    const driverLicenses = await findAllCnhUseCase.execute()

    return reply.status(200).send(driverLicenses)
}
