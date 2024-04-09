import { IpvaRepository } from '@/repositories/ipva-repository'
import { Ipva } from '@prisma/client'

interface FindIpvaByVehicleIdUseCaseRequest {
    vehicleId: string
}

interface FindIpvaByVehicleIdUseCaseResponse {
    ipva: Ipva | null
}

export class FindIpvaByVehicleIdUseCase {
    constructor(private ipvaRepository: IpvaRepository) {
        Object.freeze(this)
    }

    async execute({
        vehicleId,
    }: FindIpvaByVehicleIdUseCaseRequest): Promise<FindIpvaByVehicleIdUseCaseResponse> {
        const ipva = await this.ipvaRepository.findByVehicleId(vehicleId)

        if (!ipva) {
            throw new Error('Ipva not found')
        }

        return { ipva }
    }
}
