import { FastifyInstance } from 'fastify'
import { findAllController } from './find-all'
import { getByCpfController } from './get-by-cpf'
import { registerController } from './register'
import { updateUserController } from './update'

export async function usersRoutes(app: FastifyInstance) {
    app.post('/user/register', registerController)
    app.post('/user/:cpf', getByCpfController)
    app.get('/users', findAllController)
    app.put('/user/update/:userId', updateUserController)
}
