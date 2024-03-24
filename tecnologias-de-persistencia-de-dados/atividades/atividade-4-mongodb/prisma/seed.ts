import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const rs = await prisma.estado.create({
    data: {
      sigla: "RS",
      nome: "Rio Grande do Sul",
      dataAtualizacao: new Date(),
    },
  });

  const cidade = await prisma.cidade.create({
    data: {
      nome: "Porto Alegre",
      estadoId: rs.id,
    },
  });

  await prisma.telefone.create({
    data: {
      codacesso: 51,
      numero: "99999-9999",
      cidadeId: cidade.id,
    },
  });

  await prisma.telefone.create({
    data: {
      codacesso: 51,
      numero: "88888-8888",
      cidadeId: cidade.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });