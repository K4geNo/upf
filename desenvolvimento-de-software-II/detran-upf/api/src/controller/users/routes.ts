import { FastifyInstance } from 'fastify'
import { findAllController } from './find-all'
import { getByCpfController } from './get-by-cpf'
import { registerController } from './register'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/user/register', registerController)

    app.post('/user/:cpf', getByCpfController)

    app.get('/users', findAllController)
}
