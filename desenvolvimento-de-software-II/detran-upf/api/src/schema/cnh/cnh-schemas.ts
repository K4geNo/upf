import { z } from 'zod'

export const registerCnhSchema = z.object({
    licenseNumber: z.string(),
    category: z.string(),
    points: z.number(),
    validity: z.coerce.date(),
})

export const cnhNumberParamSchema = z.object({
    driverLicenseId: z.string(),
})

export const cnhUserIdParamSchema = z.object({
    userId: z.string(),
})

export const updateCnhSchema = z
    .object({
        category: z.string(),
        points: z.number(),
        validity: z.coerce.date(),
    })
    .partial()

export const updatePointsDriverLicenseParamsSchema = z.object({
    infractionId: z.string(),
    userId: z.string(),
})
