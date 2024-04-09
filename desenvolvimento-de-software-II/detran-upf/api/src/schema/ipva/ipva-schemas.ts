import { z } from 'zod'

export const ipvaVehicleIdParamSchema = z.object({
    vehicleId: z.string(),
})

export const ipvaIdParamSchema = z.object({
    ipvaId: z.string(),
})

export const ipvaBodySchema = z.object({
    value: z.number(),
    paymentDate: z.coerce.date(),
    currentYear: z.number(),
})

export const ipvaUpdateBodySchema = z.object({}).merge(ipvaBodySchema).partial()
