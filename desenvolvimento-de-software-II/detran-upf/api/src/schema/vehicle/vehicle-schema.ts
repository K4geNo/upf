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

export const findByLicensePlateParamsSchema = z.object({
    licensePlate: z.string(),
})

export const findVehicleByVehicleIdParamsSchema = z.object({
    vehicleId: z.string(),
})

export const updateVehicleSchema = z
    .object({
        manufacturingYear: z.number(),
        color: z.string(),
        ipvaPaid: z.boolean(),
        ipvaValue: z.number(),
        brand: z.string(),
        model: z.string(),
        type: z.number(),
    })
    .partial()
