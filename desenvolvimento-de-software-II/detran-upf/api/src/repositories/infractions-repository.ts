import { Infractions, Prisma } from '@prisma/client'

export interface InfractionsRepository {
    findAll(): Promise<Infractions[]>
    create(data: Prisma.InfractionsCreateInput): Promise<void>
    findById(id: string): Promise<Infractions | null>
    delete(id: string): Promise<void>
}
