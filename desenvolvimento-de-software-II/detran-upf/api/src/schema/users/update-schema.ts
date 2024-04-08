import { z } from 'zod'

export const updateUserBodySchema = z.object({
    personName: z.string().optional(),
    birthDate: z.coerce.date().optional(),
    phone: z.string().optional(),
    addressDescription: z.string().optional(),
    email: z.string().email().optional(),
    pcd: z.boolean().optional(),
})

export const updateUserParamsSchema = z.object({
    userId: z.string(),
})
