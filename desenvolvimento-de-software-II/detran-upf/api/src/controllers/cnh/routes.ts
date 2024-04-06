import { FastifyInstance } from 'fastify'
import { findAllCnhController } from './find-all'
import { findCnhByNumberController } from './find-cnh-by-number'
import { findCnhByUserIdController } from './find-cnh-by-userId'
import { registerCnhController } from './register'
import { updateCnhController } from './update'

export async function cnhRoutes(app: FastifyInstance) {
    app.post('/cnh/register', registerCnhController)
    app.get('/cnhs', findAllCnhController)
    app.get('/cnh/:number', findCnhByNumberController)
    app.get('/cnh/user/:userId', findCnhByUserIdController)
    app.put('/cnh/:number', updateCnhController)
}
