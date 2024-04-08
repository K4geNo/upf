import { FastifyInstance } from 'fastify'
import { addVehicleToUserController } from './save'

export async function userVehicleRoutes(app: FastifyInstance) {
    app.post('/user-vehicle/:userId/:vehicleId', addVehicleToUserController)
}
