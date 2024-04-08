import { InfractionsRepository } from '@/repositories/infractions-repository'
import { Infractions } from '@prisma/client'

interface FindAllInfractionUseCaseResponseDTO {
    infractions: Infractions[]
}

export class FindAllInfractionUseCase {
    constructor(private infractionsRepository: InfractionsRepository) {
        Object.freeze(this)
    }

    async execute(): Promise<FindAllInfractionUseCaseResponseDTO> {
        const infractions = await this.infractionsRepository.findAll()

        return { infractions }
    }
}
