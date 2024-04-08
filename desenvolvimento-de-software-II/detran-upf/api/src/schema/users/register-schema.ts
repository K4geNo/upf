import { z } from 'zod'

export const registerUserSchema = z.object({
    personName: z.string(),
    cpf: z.string(),
    addressDescription: z.string(),
    birthDate: z.coerce.date(),
    phone: z.string(),
    email: z.string().email(),
    pcd: z.boolean(),
})

export type RegisterUserSchema = z.infer<typeof registerUserSchema>
