import { z } from 'zod'

export const registerUserSchema = z.object({
    nomePessoa: z.string(),
    cpf: z.string(),
    descricaoEndereco: z.string(),
    dataNascimento: z.coerce.date(),
    telefone: z.string(),
    email: z.string().email(),
    pcd: z.boolean(),
})

export type RegisterUserSchema = z.infer<typeof registerUserSchema>
