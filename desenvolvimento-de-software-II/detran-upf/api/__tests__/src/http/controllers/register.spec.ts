import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import prisma from '@/lib/prisma'
import request from 'supertest'

describe('RegisterController', () => {
    beforeAll(async () => {
        await app.ready()
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        await app.close()
        await prisma.$disconnect()
    })

    it('should return 200', async () => {
        const response = await request(app.server).post('/user/register').send({
            cpf: '12345678901',
            dataNascimento: '2021-09-01',
            descricaoEndereco: 'Rua teste',
            email: 'teste@teste.com',
            nomePessoa: 'John Doe',
            pcd: false,
            telefone: '12345678901',
        })

        expect(response.statusCode).toEqual(201)
    })
})
