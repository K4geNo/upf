import { CnhRepository } from '../cnh-repository'
import { Prisma } from '@prisma/client'
import prisma from '@/lib/prisma'

export class PrismaCnhRepository implements CnhRepository {
    async findCNHByUserId(userId: string) {
        const cnh = await prisma.cnh.findFirst({
            where: {
                userId,
            },
        })

        return cnh
    }

    async findCNHByNumber(number: string) {
        const cnh = await prisma.cnh.findFirst({
            where: {
                numero: number,
            },
        })

        return cnh
    }

    async findAll() {
        const cnhs = await prisma.cnh.findMany()

        return cnhs
    }

    async create(data: Prisma.CnhUncheckedCreateInput) {
        const cnh = await prisma.cnh.create({
            data,
        })

        return cnh
    }

    async update(data: Prisma.CnhUncheckedUpdateInput, cnhNumber: string) {
        const cnh = await prisma.cnh.update({
            where: {
                numero: cnhNumber,
            },
            data,
        })

        return cnh
    }
}
