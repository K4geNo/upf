import { FastifyInstance } from 'fastify'
import { registerCnhController } from './register'

export async function cnhRoutes(app: FastifyInstance) {
    app.post('/cnh/register', registerCnhController)
}
