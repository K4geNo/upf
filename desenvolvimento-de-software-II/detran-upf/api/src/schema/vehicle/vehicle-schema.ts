import { z } from 'zod'

export const registerVehicleSchema = z.object({
    anoFabricacao: z.number(),
    cor: z.string(),
    ipvaQuitado: z.boolean(),
    ipvaValor: z.number(),
    marca: z.string(),
    modelo: z.string(),
    placa: z.string(),
    tipo: z.number(),
})
