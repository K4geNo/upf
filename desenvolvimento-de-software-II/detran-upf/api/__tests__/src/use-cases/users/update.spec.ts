import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryUsersRepository } from '../../../../src/repositories/in-memory/in-memory-users-repository'
import { UpdateUserUseCase } from '../../../../src/use-cases/users/update'

let usersRepository: InMemoryUsersRepository
let updateUserUseCase: UpdateUserUseCase

describe('UpdateUserUseCase', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        updateUserUseCase = new UpdateUserUseCase(usersRepository)
    })

    it('should update a user successfully', async () => {
        const date = new Date()

        const createdUser = await usersRepository.create({
            nome_pessoa: 'John Doe',
            email: 'teste@teste.com',
            cpf: '12345678900',
            createdAt: date,
            data_nascimento: date,
            descricao_endereco: 'Rua teste',
            id: 'user-id',
            pcd: false,
            telefone: '1234567890',
        })

        const { user } = await updateUserUseCase.execute({
            userId: createdUser.id,
            data: {
                nome_pessoa: 'John Doe 2',
                email: 'teste@teste.com',
            },
        })

        expect(user.nome_pessoa).toEqual('John Doe 2')
    })

    it('should throw an error if user is not found', async () => {
        await expect(
            updateUserUseCase.execute({
                userId: 'invalid-id',
                data: {
                    nome_pessoa: 'John Doe 2',
                    email: 'teste@teste.com',
                },
            }),
        ).rejects.toThrow('User not found.')
    })
})
