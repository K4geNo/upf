import { z } from "zod";

export const cidadeIdParamSchema = z.object({
    cidadeId: z.string()
});

export const cidadeIdAndTelefoneIdParamSchema = z.object({
    cidadeId: z.string(),
    telefoneId: z.string()
});

export const cidadeNomeParamSchema = z.object({
    cidadeNome: z.string()
});

export const codAcessoAndNumeroSchema = z.object({
    codacesso: z.coerce.number(),
    numero: z.string()
});

export const siglaStateParamSchema = z.object({
    sigla: z.string()
})

export const stateIdParamSchema = z.object({
    stateId: z.string()
});