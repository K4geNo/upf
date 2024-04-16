import { FastifyInstance } from 'fastify'
import { findAllDriverLicenseController } from './find-all'
import { findByLicenseNumberController } from './find-cnh-by-number'
import { findDriverLicenseByUserIdController } from './find-cnh-by-userId'
import { registerDriverLicenseController } from './register'
import { updateDriverLicenseController } from './update'
import { updatePointsDriverLicenseController } from './update-points-driver-license'

export async function cnhRoutes(app: FastifyInstance) {
    app.post('/driverLicense/register/:userId', registerDriverLicenseController)
    app.get('/driverLicenses', findAllDriverLicenseController)
    app.get('/driverLicense/:licenseNumber', findByLicenseNumberController)
    app.get('/driverLicense/user/:userId', findDriverLicenseByUserIdController)
    app.put('/driverLicense/:driverLicenseId', updateDriverLicenseController)
    app.put(
        '/driverLicense/update-points/:infractionId/:userId',
        updatePointsDriverLicenseController,
    )
}
