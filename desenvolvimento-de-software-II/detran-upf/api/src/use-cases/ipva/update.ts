import { IpvaRepository } from '@/repositories/ipva-repository'
import { Prisma } from '@prisma/client'

interface UpdateIpvaUseCaseRequest {
    ipvaId: string
    data: Prisma.IpvaUncheckedUpdateInput
}

export class UpdateIpvaUseCase {
    constructor(private ipvaRepository: IpvaRepository) {
        Object.freeze(this)
    }

    async execute({ data, ipvaId }: UpdateIpvaUseCaseRequest): Promise<void> {
        const ipva = await this.ipvaRepository.findByIpvaId(ipvaId)

        if (!ipva) {
            throw new Error('Ipva not found')
        }

        await this.ipvaRepository.update(ipvaId, data)
    }
}
