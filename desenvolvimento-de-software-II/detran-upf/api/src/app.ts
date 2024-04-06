import { ZodError } from 'zod'
import { cnhRoutes } from './controllers/cnh/routes'
import cors from '@fastify/cors'
import fastify from 'fastify'
import { usersRoutes } from './controllers/users/routes'

export const app = fastify()

app.register(cors, {
    origin: true,
    credentials: true,
})

// Routes
app.register(usersRoutes)
app.register(cnhRoutes)

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
