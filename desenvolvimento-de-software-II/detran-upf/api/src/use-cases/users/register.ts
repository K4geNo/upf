import { User } from '@prisma/client'
import { UsersRepository } from '../../repositories/users-repository'

interface RegisterUseCaseRequestDTO {
    nomePessoa: string
    cpf: string
    descricaoEndereco: string
    dataNascimento: Date
    telefone: string
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
        nomePessoa,
        cpf,
        dataNascimento,
        descricaoEndereco,
        telefone,
        email,
        pcd,
    }: RegisterUseCaseRequestDTO): Promise<RegisterUseCaseResponseDTO> {
        const userAlreadyExists = await this.usersRepository.findUserByCpf(cpf)

        if (userAlreadyExists) {
            throw new Error('User already exists.')
        }

        const user = await this.usersRepository.create({
            nome_pessoa: nomePessoa,
            cpf,
            data_nascimento: dataNascimento,
            pcd,
            descricao_endereco: descricaoEndereco,
            email,
            telefone,
        })

        return { user }
    }
}
