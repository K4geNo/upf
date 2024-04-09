import { IpvaRepository } from '@/repositories/ipva-repository'

interface RegisterIpvaUseCaseRequest {
    value: number
    paymentDate: Date
    currentYear: number
    vehicleId: string
}

export class RegisterIpvaUseCase {
    constructor(private ipvaRepository: IpvaRepository) {
        Object.freeze(this)
    }

    async execute({
        paymentDate,
        currentYear,
        value,
        vehicleId,
    }: RegisterIpvaUseCaseRequest): Promise<void> {
        const ipva = await this.ipvaRepository.findByVehicleId(vehicleId)

        if (ipva) {
            throw new Error('IPVA already registered')
        }

        await this.ipvaRepository.create({
            value,
            paymentDate,
            currentYear,
            vehicle: {
                connect: {
                    id: vehicleId,
                },
            },
        })
    }
}
