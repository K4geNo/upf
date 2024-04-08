import { InfractionsRepository } from '@/repositories/infractions-repository'

interface RegisterInfractionUseCaseRequestDTO {
    value: number
    date: Date
    points: number
    userId: string
    vehicleId: string
}

export class RegisterInfractionUseCase {
    constructor(private infractionsRepository: InfractionsRepository) {
        Object.freeze(this)
    }

    async execute({
        date,
        points,
        value,
        userId,
        vehicleId,
    }: RegisterInfractionUseCaseRequestDTO): Promise<void> {
        const infractionAlreadyExists =
            await this.infractionsRepository.findById(vehicleId)

        if (infractionAlreadyExists) {
            throw new Error('Infraction already exists.')
        }

        await this.infractionsRepository.create({
            date,
            points,
            value,
            user: {
                connect: {
                    id: userId,
                },
            },
            vehicle: {
                connect: {
                    id: vehicleId,
                },
            },
        })
    }
}
