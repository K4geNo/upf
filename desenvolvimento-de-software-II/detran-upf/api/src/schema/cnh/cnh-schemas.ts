import { z } from 'zod'

export const registerCnhSchema = z.object({
    numero: z.string(),
    categoria: z.string(),
    pontos: z.number(),
    validade: z.coerce.date(),
    userId: z.string(),
})

export const cnhNumberParamSchema = z.object({
    number: z.string(),
})

export const cnhUserIdParamSchema = z.object({
    userId: z.string(),
})

export const updateCnhSchema = z
    .object({
        numero: z.string(),
        categoria: z.string(),
        pontos: z.number(),
        validade: z.coerce.date(),
    })
    .partial()
