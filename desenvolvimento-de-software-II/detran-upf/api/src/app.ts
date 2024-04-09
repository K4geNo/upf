import { ZodError } from 'zod'
import { cnhRoutes } from './controllers/cnh/routes'
import cors from '@fastify/cors'
import fastify from 'fastify'
import { usersRoutes } from './controllers/users/routes'
import { vehiclesRoutes } from './controllers/vehicles/routes'
import { infractionsRoutes } from './controllers/infractions/routes'
import { userVehicleRoutes } from './controllers/user-vehicle/routes'
import { ipvaRoutes } from './controllers/ipva/routes'

export const app = fastify()

app.register(cors, {
    origin: true,
    credentials: true,
})

// Routes
app.register(usersRoutes)
app.register(cnhRoutes)
app.register(vehiclesRoutes)
app.register(infractionsRoutes)
app.register(userVehicleRoutes)
app.register(ipvaRoutes)

app.setErrorHandler((error, _, reply) => {
    if (error instanceof ZodError) {
        return reply.status(400).send({
            message: 'Validation failed',
            issues: error.format(),
        })
    }

    if (error.statusCode) {
        return reply.status(error.statusCode).send({
            message: error.message,
        })
    }

    console.error(error)

    return reply.status(500).send({
        message: 'Internal server error',
    })
})
