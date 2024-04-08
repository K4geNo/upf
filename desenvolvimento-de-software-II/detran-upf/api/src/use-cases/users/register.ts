import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'

interface RegisterUseCaseRequestDTO {
    personName: string
    cpf: string
    addressDescription: string
    birthDate: Date
    phone: string
    email: string
    pcd: boolean
}

interface RegisterUseCaseResponseDTO {
    user: User
}

export class RegisterUseCase {
    constructor(private usersRepository: UsersRepository) {
        Object.freeze(this.usersRepository)
    }

    async execute({
        personName,
        cpf,
        addressDescription,
        birthDate,
        phone,
        email,
        pcd,
    }: RegisterUseCaseRequestDTO): Promise<RegisterUseCaseResponseDTO> {
        const userAlreadyExists = await this.usersRepository.findUserByCpf(cpf)

        if (userAlreadyExists) {
            throw new Error('User already exists.')
        }

        const user = await this.usersRepository.create({
            personName,
            cpf,
            birthDate,
            pcd,
            addressDescription,
            email,
            phone,
        })

        return { user }
    }
}
