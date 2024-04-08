import { FastifyInstance } from 'fastify'
import { RegisterVehicleController } from './register'
import { findAllVehiclesController } from './find-all'
import { findByLicensePlateController } from './find-by-license-plate'
import { updateVehicleController } from './update'

export async function vehiclesRoutes(app: FastifyInstance) {
    app.post('/vehicle/register', RegisterVehicleController)
    app.get('/vehicles', findAllVehiclesController)
    app.get('/vehicle/:licensePlate', findByLicensePlateController)
    app.put('/vehicle/:vehicleId', updateVehicleController)
}
