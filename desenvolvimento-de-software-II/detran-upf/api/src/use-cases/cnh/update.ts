import { Cnh, Prisma } from '@prisma/client'

import { CnhRepository } from '@/repositories/cnh-repository'

interface UpdateCnhUseCaseDTO {
    data: Prisma.CnhUncheckedUpdateInput
    cnhNumber: string
}

interface UpdateCnhUseCaseResponse {
    cnh: Cnh
}

export class UpdateCnhUseCase {
    constructor(private cnhRepository: CnhRepository) {
        Object.freeze(this.cnhRepository)
    }

    async execute({
        data,
        cnhNumber,
    }: UpdateCnhUseCaseDTO): Promise<UpdateCnhUseCaseResponse> {
        const cnh = await this.cnhRepository.update(data, cnhNumber)

        if (!cnh) {
            throw new Error('CNH not found.')
        }

        return { cnh }
    }
}
