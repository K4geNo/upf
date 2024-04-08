import { z } from 'zod'

export const registerInfractionBodySchema = z.object({
    value: z.number(),
    date: z.coerce.date(),
    points: z.number(),
})

export const registerInfractionParamsSchema = z.object({
    userId: z.string(),
    vehicleId: z.string(),
})

export const findInfractionByIdParamsSchema = z.object({
    id: z.string(),
})
