import { PrismaIpvaRepository } from '@/repositories/prisma/prisma-ipva-repository'
import { ipvaIdParamSchema } from '@/schema/ipva/ipva-schemas'
import { DeleteIpvaUseCase } from '@/use-cases/ipva/delete'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function deleteIpvaController(
    req: FastifyRequest,
    reply: FastifyReply,
) {
    const prismaIpvaRepository = new PrismaIpvaRepository()
    const deleteIpvaUseCase = new DeleteIpvaUseCase(prismaIpvaRepository)

    const { ipvaId } = ipvaIdParamSchema.parse(req.params)

    try {
        await deleteIpvaUseCase.execute({ ipvaId })

        return reply.status(204).send()
    } catch (error) {
        if (error instanceof Error) {
            return reply.status(404).send({ message: error.message })
        }

        return reply.status(500).send({ message: 'Internal Server Error' })
    }
}
