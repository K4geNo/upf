import { FastifyInstance } from 'fastify'
import { registerInfractionController } from './register'
import { findInfractionByIdController } from './findById'
import { findAllInfractionsController } from './findAll'
import { deleteInfractionController } from './delete'

export async function infractionsRoutes(app: FastifyInstance) {
    app.post(
        '/infractions/register/:userId/:vehicleId',
        registerInfractionController,
    )
    app.get('/infraction/:id', findInfractionByIdController)
    app.get('/infractions', findAllInfractionsController)
    app.delete('/infraction/:id', deleteInfractionController)
}
