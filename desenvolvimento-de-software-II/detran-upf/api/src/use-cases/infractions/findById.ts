import { InfractionsRepository } from '@/repositories/infractions-repository'
import { Infractions } from '@prisma/client'

interface FindByIdUseCaseResponseDTO {
    infraction: Infractions
}

export interface FindByIdUseCaseRequestDTO {
    id: string
}

export class FindByIdUseCase {
    constructor(private infractionsRepository: InfractionsRepository) {
        Object.freeze(this)
    }

    async execute({
        id,
    }: FindByIdUseCaseRequestDTO): Promise<FindByIdUseCaseResponseDTO> {
        const infraction = await this.infractionsRepository.findById(id)

        if (!infraction) {
            throw new Error('Infraction not found')
        }

        return { infraction }
    }
}
