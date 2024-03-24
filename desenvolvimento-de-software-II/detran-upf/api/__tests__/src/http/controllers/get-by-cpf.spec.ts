import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/app'
import prisma from '@/lib/prisma'
import request from 'supertest'

describe('GetByCpf Controller', () => {
    beforeAll(async () => {
        await app.ready()
        await prisma.user.deleteMany()
    })

    afterAll(async () => {
        await app.close()
        await prisma.$disconnect()
    })

    it('should be able to get user by cpf', async () => {
        await request(app.server).post('/user/register').send({
            cpf: '12345678902',
            dataNascimento: '2021-09-01',
            descricaoEndereco: 'Rua teste',
            email: 'teste@teste.com',
            nomePessoa: 'John Doe',
            pcd: false,
            telefone: '12345678901',
        })

        const response = await request(app.server).post(`/user/12345678902`)

        expect(response.statusCode).toEqual(200)
        expect(response.body.user).toEqual(
            expect.objectContaining({
                email: 'teste@teste.com',
            }),
        )
    })

    it('should return 404 if user not found', async () => {
        const response = await request(app.server).post(`/user/12345678903`)

        expect(response.statusCode).toEqual(404)
        expect(response.body).toEqual(
            expect.objectContaining({
                message: 'User not found.',
            }),
        )
    })
})
