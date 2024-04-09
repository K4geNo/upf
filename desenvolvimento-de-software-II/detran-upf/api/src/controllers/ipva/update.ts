import { PrismaIpvaRepository } from '@/repositories/prisma/prisma-ipva-repository'
import {
    ipvaIdParamSchema,
    ipvaUpdateBodySchema,
} from '@/schema/ipva/ipva-schemas'
import { UpdateIpvaUseCase } from '@/use-cases/ipva/update'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function UpdateIpvaController(
    req: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaIpvaRepository = new PrismaIpvaRepository()
    const updateIpvaUseCase = new UpdateIpvaUseCase(prismaIpvaRepository)

    const { ipvaId } = ipvaIdParamSchema.parse(req.params)

    const { currentYear, paymentDate, value } = ipvaUpdateBodySchema.parse(
        req.body,
    )

    try {
        await updateIpvaUseCase.execute({
            ipvaId,
            data: {
                currentYear,
                paymentDate,
                value,
            },
        })

        return reply.status(204).send()
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
