import { IpvaRepository } from '@/repositories/ipva-repository'

interface DeleteIpvaUseCaseRequest {
    ipvaId: string
}

export class DeleteIpvaUseCase {
    constructor(private ipvaRepository: IpvaRepository) {
        Object.freeze(this)
    }

    async execute({ ipvaId }: DeleteIpvaUseCaseRequest): Promise<void> {
        const ipva = await this.ipvaRepository.findByIpvaId(ipvaId)

        if (!ipva) {
            throw new Error('Ipva not found')
        }

        await this.ipvaRepository.delete(ipvaId)
    }
}
