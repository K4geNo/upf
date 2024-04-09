import { Ipva, Prisma } from '@prisma/client'
import { IpvaRepository } from '../ipva-repository'
import prisma from '@/lib/prisma'

export class PrismaIpvaRepository implements IpvaRepository {
    async create(data: Prisma.IpvaCreateInput): Promise<void> {
        await prisma.ipva.create({ data })
    }

    async findByVehicleId(vehicleId: string): Promise<Ipva | null> {
        const ipva = await prisma.ipva.findFirst({
            where: {
                vehicleId,
            },
        })

        return ipva
    }

    async findByIpvaId(ipvaId: string): Promise<Ipva | null> {
        const ipva = await prisma.ipva.findFirst({
            where: {
                id: ipvaId,
            },
        })

        return ipva
    }

    async update(
        ipvaId: string,
        data: Prisma.IpvaUncheckedUpdateInput,
    ): Promise<void> {
        await prisma.ipva.update({
            where: {
                id: ipvaId,
            },
            data,
        })
    }

    async delete(ipvaId: string): Promise<void> {
        await prisma.ipva.delete({
            where: {
                id: ipvaId,
            },
        })
    }
}
