import { Cnh } from '@prisma/client'
import { CnhRepository } from '@/repositories/cnh-repository'

interface RegisterCnhUseCaseRequestDTO {
    numero: string
    categoria: string
    pontos: number
    validade: Date
    userId: string
}

interface RegisterCnhUseCaseResponseDTO {
    cnh: Cnh
}

export class RegisterCnhUseCase {
    constructor(private cnhRepository: CnhRepository) {
        Object.freeze(this.cnhRepository)
    }

    async execute({
        categoria,
        numero,
        pontos,
        userId,
        validade,
    }: RegisterCnhUseCaseRequestDTO): Promise<RegisterCnhUseCaseResponseDTO> {
        const cnhAlreadyExists =
            await this.cnhRepository.findCNHByNumber(numero)

        if (cnhAlreadyExists) {
            throw new Error('CNH already exists.')
        }

        const cnh = await this.cnhRepository.create({
            categoria,
            numero,
            pontos,
            userId,
            validade,
        })

        return { cnh }
    }
}
