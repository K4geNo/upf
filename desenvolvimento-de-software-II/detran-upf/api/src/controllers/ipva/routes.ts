import { FastifyInstance } from 'fastify'
import { RegisterIpvaController } from './register'
import { findIpvaByVehicleIdController } from './find-by-vehicleId'
import { deleteIpvaController } from './delete'
import { UpdateIpvaController } from './update'

export async function ipvaRoutes(app: FastifyInstance) {
    app.post('/ipva/register/:vehicleId', RegisterIpvaController)
    app.get('/ipva/:vehicleId', findIpvaByVehicleIdController)
    app.put('/ipva/:ipvaId', UpdateIpvaController)
    app.delete('/ipva/:ipvaId', deleteIpvaController)
}
