import { InfractionsRepository } from '@/repositories/infractions-repository'

interface DeleteInfractionUseCaseRequestDTO {
    id: string
}

export class DeleteInfractionUseCase {
    constructor(private infractionsRepository: InfractionsRepository) {
        Object.freeze(this)
    }

    async execute({ id }: DeleteInfractionUseCaseRequestDTO): Promise<void> {
        const infraction = await this.infractionsRepository.findById(id)

        if (!infraction) {
            throw new Error('Infraction not found')
        }

        await this.infractionsRepository.delete(id)
    }
}
