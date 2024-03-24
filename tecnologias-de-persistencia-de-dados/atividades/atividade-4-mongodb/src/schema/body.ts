import { z } from "zod";

export const telefoneCreateManySchema = z.object({
    data: z.array(z.object({
        numero: z.string(),
        codacesso: z.number(),
    }))
});

export const telefoneUpdateSchema = z.object({
    numero: z.string(),
    codacesso: z.number(),
});