import { Cnh, Prisma } from '@prisma/client'

export interface CnhRepository {
    findCNHByUserId(userId: string): Promise<Cnh | null>
    findCNHByNumber(number: string): Promise<Cnh | null>
    findAll(): Promise<Cnh[]>
    create(data: Prisma.CnhUncheckedCreateInput): Promise<Cnh>
    update(
        data: Prisma.CnhUncheckedUpdateInput,
        cnhNumber: string,
    ): Promise<Cnh>
}
