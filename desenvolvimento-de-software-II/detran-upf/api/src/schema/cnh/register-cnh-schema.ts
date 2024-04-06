import { z } from 'zod'

export const registerCnhSchema = z.object({
    numero: z.string(),
    categoria: z.string(),
    pontos: z.number(),
    validade: z.coerce.date(),
    userId: z.string(),
})
