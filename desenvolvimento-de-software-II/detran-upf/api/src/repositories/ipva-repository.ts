import { Ipva, Prisma } from '@prisma/client'

export interface IpvaRepository {
    create: (data: Prisma.IpvaCreateInput) => Promise<void>
    findByVehicleId: (vehicleId: string) => Promise<Ipva | null>
    findByIpvaId: (ipvaId: string) => Promise<Ipva | null>
    update: (
        ipvaId: string,
        data: Prisma.IpvaUncheckedUpdateInput,
    ) => Promise<void>
    delete: (ipvaId: string) => Promise<void>
}
