import { Cnh, Prisma } from '@prisma/client'

import { CnhRepository } from '../cnh-repository'

export class InMemoryCnhRepository implements CnhRepository {
    public items: Cnh[] = []

    async findCNHByUserId(userId: string) {
        const cnh = this.items.find((cnh) => cnh.userId === userId)

        if (!cnh) {
            return null
        }

        return cnh
    }

    async findCNHByNumber(number: string) {
        const cnh = this.items.find((cnh) => cnh.numero === number)

        if (!cnh) {
            return null
        }

        return cnh
    }

    async findAll() {
        return this.items
    }

    async create(data: Prisma.CnhUncheckedCreateInput) {
        const cnh = {
            categoria: data.categoria,
            createdAt: new Date(),
            numero: data.numero,
            pontos: data.pontos,
            userId: data.userId,
            validade: data.validade as Date,
        }

        this.items.push(cnh)

        return cnh
    }

    async update(data: Cnh, cnhNumber: string) {
        const cnhIndex = this.items.findIndex((cnh) => cnh.numero === cnhNumber)

        if (cnhIndex >= 0) {
            this.items[cnhIndex] = data
        }

        return this.items[cnhIndex]
    }
}
