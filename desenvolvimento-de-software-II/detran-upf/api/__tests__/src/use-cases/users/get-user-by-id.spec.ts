import { beforeEach, describe, expect, it } from 'vitest'

import { GetUserByIdUseCase } from '../../../../src/use-cases/users/get-user-by-id'
import { InMemoryUsersRepository } from '../../../../src/repositories/in-memory/in-memory-users-repository'

let usersRepository: InMemoryUsersRepository
let sut: GetUserByIdUseCase

describe('Get User By Id Use Case', () => {
    beforeEach(() => {
        usersRepository = new InMemoryUsersRepository()
        sut = new GetUserByIdUseCase(usersRepository)
    })

    it('should be able to register a new user', async () => {
        const createdUser = await usersRepository.create({
            cpf: '12345678900',
            data_nascimento: new Date(),
            descricao_endereco: 'Rua teste',
            email: 'johndoe@example.com',
            nome_pessoa: 'John Doe',
            pcd: false,
            telefone: 1234567890,
            id: '1',
        })

        const { user } = await sut.execute({
            userId: createdUser.id,
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('should not be able to get a user that does not exist', async () => {
        await expect(
            sut.execute({
                userId: '1',
            }),
        ).rejects.toThrow('User not found.')
    })
})
