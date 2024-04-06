import { CnhRepository } from '@/repositories/cnh-repository'

export class FindCnhByNumberUseCase {
    constructor(private cnhRepository: CnhRepository) {
        Object.freeze(this.cnhRepository)
    }

    async execute(number: string) {
        const cnh = await this.cnhRepository.findCNHByNumber(number)

        if (!cnh) {
            throw new Error('CNH not found')
        }

        return { cnh }
    }
}
