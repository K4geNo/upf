import { z } from 'zod'

export const updateUserBodySchema = z.object({
    nomePessoa: z.string().optional(),
    dataNascimento: z.coerce.date().optional(),
    telefone: z.string().optional(),
    descricaoEndereco: z.string().optional(),
    email: z.string().email().optional(),
    pcd: z.boolean().optional(),
})

export const updateUserParamsSchema = z.object({
    userId: z.string(),
})
