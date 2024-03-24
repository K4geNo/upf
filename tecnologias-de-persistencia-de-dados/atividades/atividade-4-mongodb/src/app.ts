import { cidadeIdAndTelefoneIdParamSchema, cidadeIdParamSchema, cidadeNomeParamSchema, codAcessoAndNumeroSchema, siglaStateParamSchema, stateIdParamSchema } from "./schema/params";
import { telefoneCreateManySchema, telefoneUpdateSchema } from "./schema/body";

import fastify from "fastify";
import { prisma } from "./lib/prisma";

export const app = fastify()

// Listar todos os estados
app.get('/estados', async (req, res) => {
    const estados = await prisma.estado.findMany({
        include: {
            cidades: true,
        }
    })

    return res.send(estados)
})

// Listar todos os estados
app.get('/cidades', async (req, res) => {
    const cidades = await prisma.cidade.findMany({
        include: {
            estado: true,
            telefones: true,
        }
    })

    return res.send(cidades)
})

// Listar todos os telefones
app.get('/telefones', async (req, res) => {
    const telefones = await prisma.telefone.findMany({
        include: {
            cidade: {
                include: {
                    estado: true
                }
            }
        }
    })

    return res.send(telefones)
})

// Inserir 2 novos telefones em uma cidade do estado do RS (de sua escolha)
app.post('/cidade/:cidadeId/telefone', async (req, res) => {
    const { cidadeId } = cidadeIdParamSchema.parse(req.params)
    const { data } = telefoneCreateManySchema.parse(req.body)

    const createdTelefones = await prisma.telefone.createMany({
        data: data.map((telefone) => ({
            ...telefone,
            cidadeId: cidadeId
        }))
    })

    return res.status(201).send(createdTelefones)
})

// Modificar o telefone da cidade de Passo Fundo, RS
app.put('/cidade/:cidadeId/telefone/:telefoneId', async (req, res) => {
    const { cidadeId, telefoneId } = cidadeIdAndTelefoneIdParamSchema.parse(req.params)
    const { codacesso, numero } = telefoneUpdateSchema.parse(req.body)

    const updatedTelefone = await prisma.telefone.update({
        where: {
            id: telefoneId,
        },
        data: {
            codacesso,
            numero,
            cidadeId,
        }
    })

    if (!updatedTelefone) {
        return res.status(404).send({ message: "Telefone não encontrado." });
    }

    return res.status(200).send(updatedTelefone)
})

// Obter a sigla e o nome do estado que tem uma cidade chamada "Porto Alegre"
app.get('/estado/cidade/:cidadeNome', async (req, res) => {
    const { cidadeNome } = cidadeNomeParamSchema.parse(req.params)

    const cidade = await prisma.cidade.findFirst({
        where: {
            nome: cidadeNome
        },
        include: { estado: true }
    })

    if (!cidade) {
        return res.status(404).send({ message: "Cidade não encontrada." });
    }

    return res.status(200).send({
        sigla: cidade?.estado.sigla,
        nome: cidade?.estado.nome
    })
})

// Obter o nome da cidade que possui codacesso = 54 e numero = "981207562"
app.get('/cidade/telefone/:codacesso/:numero', async (req, res) => {
    const { codacesso, numero } = codAcessoAndNumeroSchema.parse(req.params)

    const cidade = await prisma.cidade.findFirst({
        where: {
            telefones: {
                some: {
                    codacesso,
                    numero
                }
            }
        }
    })

    if (!cidade) {
        return res.status(404).send({ message: "Cidade não encontrada." });
    }

    return res.status(200).send({
        nome: cidade?.nome
    })
})

// Obter todos os telefones do estado de sigla RS
app.get('/estado/:sigla/telefone', async (req, res) => {
    const { sigla } = siglaStateParamSchema.parse(req.params)

    const telefones = await prisma.telefone.findMany({
        where: {
            cidade: {
                estado: {
                    sigla
                }
            }
        }
    })

    if (!telefones.length) {
        return res.status(404).send({ message: "Nenhum telefone encontrado." });
    }

    return res.status(200).send(telefones)
})

// Contar quantos telefones há no estado de sigla RS
app.get('/estado/:sigla/telefone/count', async (req, res) => {
    const { sigla } = siglaStateParamSchema.parse(req.params)

    const count = await prisma.telefone.count({
        where: {
            cidade: {
                estado: {
                    sigla
                }
            }
        }
    })

    if (!count) {
        return res.status(404).send({ message: "Nenhum telefone encontrado." });
    }

    return res.status(200).send({
        count
    })
})

// Adicionar ao estado do RS um atributo "dataAtualizacao", contendo a data de hoje.
app.put('/estado/:stateId', async (req, res) => {
    const { stateId } = stateIdParamSchema.parse(req.params)

    const updatedEstado = await prisma.estado.update({
        where: {
            id: stateId
        },
        data: {
            dataAtualizacao: new Date()
        }
    })

    if (!updatedEstado) {
        return res.status(404).send({ message: "Estado não encontrado." });
    }

    return res.status(200).send(updatedEstado)
})

// Remover um telefone de uma cidade e estado de sua escolha.
app.delete('/cidade/:cidadeId/telefone/:telefoneId', async (req, res) => {
    const { cidadeId, telefoneId } = cidadeIdAndTelefoneIdParamSchema.parse(req.params)

    const telefone = await prisma.telefone.findUnique({
        where: {
            id: telefoneId,
        },
        include: {
            cidade: true,
        },
    });

    if (!telefone) {
        return res.status(404).send({ message: "Telefone não encontrado." });
    }

    if (telefone.cidade.id !== cidadeId) {
        return res.status(400).send({ message: "O telefone não pertence à cidade especificada." });
    }

    await prisma.telefone.delete({
        where: {
            id: telefoneId,
        },
    });

    return res.status(204).send()
})