import { CnhRepository } from '@/repositories/cnh-repository'

export class FindCnhByUserIdUseCase {
    constructor(private cnhRepository: CnhRepository) {
        Object.freeze(this.cnhRepository)
    }

    async execute(userId: string) {
        const cnh = await this.cnhRepository.findCNHByUserId(userId)

        if (!cnh) {
            throw new Error('CNH not found')
        }

        return { cnh }
    }
}
