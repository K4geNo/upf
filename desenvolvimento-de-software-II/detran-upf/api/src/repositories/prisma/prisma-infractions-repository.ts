import { Infractions, Prisma } from '@prisma/client'
import { InfractionsRepository } from '../infractions-repository'
import prisma from '@/lib/prisma'

export class PrismaInfractionsRepository implements InfractionsRepository {
    async create(data: Prisma.InfractionsCreateInput): Promise<void> {
        await prisma.infractions.create({
            data,
        })
    }

    async delete(id: string): Promise<void> {
        await prisma.infractions.delete({
            where: {
                id,
            },
        })
    }

    async findAll(): Promise<Infractions[]> {
        const infractions = await prisma.infractions.findMany()

        return infractions
    }

    async findById(id: string): Promise<Infractions | null> {
        const infraction = await prisma.infractions.findUnique({
            where: {
                id,
            },
        })

        return infraction
    }
}
