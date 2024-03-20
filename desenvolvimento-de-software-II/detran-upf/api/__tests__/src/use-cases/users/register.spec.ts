import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../../../../src/repositories/in-memory/in-memory-users-repository'
import { RegisterUseCase } from '../../../../src/use-cases/users/register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register User Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new RegisterUseCase(usersRepository)
    })

    it('should be able to register a new user', async () => {
        const { user } = await sut.execute({
            cpf: '12345678900',
            dataNascimento: new Date(),
            descricaoEndereco: 'Rua teste',
            email: 'johndoe@example.com',
            nomePessoa: 'John Doe',
            pcd: false,
            telefone: '1234567890',
        })

        expect(user.cpf).toEqual(expect.any(String))
    })

    it('should not be able to register a user with an existing CPF', async () => {
        await sut.execute({
            cpf: '12345678900',
            dataNascimento: new Date(),
            descricaoEndereco: 'Rua teste',
            email: 'johndoe@example.com',
            nomePessoa: 'John Doe',
            pcd: false,
            telefone: '1234567890',
        })

        await expect(
            sut.execute({
                cpf: '12345678900',
                dataNascimento: new Date(),
                descricaoEndereco: 'Rua teste',
                email: 'johndoe@example.com',
                nomePessoa: 'John Doe',
                pcd: false,
                telefone: '1234567890',
            }),
        ).rejects.toThrow('User already exists.')
    })
})
