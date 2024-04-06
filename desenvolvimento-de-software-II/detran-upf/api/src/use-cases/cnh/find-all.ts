import { Cnh } from '@prisma/client'
import { CnhRepository } from '@/repositories/cnh-repository'

interface FindAllCnhResponseDTO {
    cnhs: Cnh[]
}

export class FindAllCnhUseCase {
    constructor(private cnhRepository: CnhRepository) {
        Object.freeze(this.cnhRepository)
    }

    async execute(): Promise<FindAllCnhResponseDTO> {
        const cnhs = await this.cnhRepository.findAll()

        return { cnhs }
    }
}
