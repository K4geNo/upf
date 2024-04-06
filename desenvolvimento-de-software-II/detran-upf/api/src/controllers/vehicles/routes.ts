import { FastifyInstance } from 'fastify'
import { RegisterVehicleController } from './register'

export async function vehiclesRoutes(app: FastifyInstance) {
    app.post('/vehicle/register', RegisterVehicleController)
}
