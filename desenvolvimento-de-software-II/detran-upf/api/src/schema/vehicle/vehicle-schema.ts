import { z } from 'zod'

export const registerVehicleSchema = z.object({
    manufacturingYear: z.number(),
    color: z.string(),
    ipvaPaid: z.boolean(),
    ipvaValue: z.number(),
    brand: z.string(),
    model: z.string(),
    licensePlate: z.string(),
    type: z.number(),
})
