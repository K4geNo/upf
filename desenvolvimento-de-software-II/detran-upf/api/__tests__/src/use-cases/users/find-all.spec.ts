import { beforeEach, describe, expect, it } from 'vitest'

import { FindAllUseCase } from '../../../../src/use-cases/users/find-all'
import { InMemoryUsersRepository } from '../../../../src/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: FindAllUseCase

describe('Find All Users', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new FindAllUseCase(usersRepository)
    })

    it('should be able to find all users', async () => {
        await usersRepository.create({
            cpf: '12345678900',
            email: 'user@teste.com',
            pcd: true,
            createdAt: new Date(),
            data_nascimento: new Date(),
            descricao_endereco: 'Rua teste',
            nome_pessoa: 'User Teste',
            telefone: '1234567890',
            id: '1',
        })

        const users = await sut.execute()

        expect(users).toEqual({
            users: [
                {
                    cpf: '12345678900',
                    email: 'user@teste.com',
                    pcd: true,
                    createdAt: new Date(),
                    data_nascimento: new Date(),
                    descricao_endereco: 'Rua teste',
                    id: '1',
                    nome_pessoa: 'User Teste',
                    telefone: '1234567890',
                },
            ],
        })
    })
})
