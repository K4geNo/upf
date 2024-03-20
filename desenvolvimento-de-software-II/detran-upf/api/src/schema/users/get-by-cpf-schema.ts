import { z } from 'zod'

export const getByCpfSchema = z.object({
    cpf: z.string().length(11),
})

export type GetByCpfSchema = z.infer<typeof getByCpfSchema>
