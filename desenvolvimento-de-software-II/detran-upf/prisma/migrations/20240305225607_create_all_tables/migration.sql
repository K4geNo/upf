-- CreateTable
CREATE TABLE "Pessoa" (
    "id" TEXT NOT NULL,
    "nome_pessoa" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "descricao_endereco" TEXT,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "telefone" INTEGER,
    "email" TEXT,
    "pcd" BOOLEAN NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cnh" (
    "numero" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "validade" TIMESTAMP(3) NOT NULL,
    "pontos" INTEGER NOT NULL,

    CONSTRAINT "Cnh_pkey" PRIMARY KEY ("numero")
);

-- CreateTable
CREATE TABLE "Veiculo" (
    "id" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "cor" TEXT NOT NULL,
    "ano_fabricacao" INTEGER NOT NULL,
    "modelo" TEXT NOT NULL,
    "tipo" INTEGER NOT NULL,
    "ipva_quitado" INTEGER NOT NULL,
    "ipva_valor" INTEGER NOT NULL,
    "Column1" INTEGER NOT NULL,

    CONSTRAINT "Veiculo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ipva" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data_pagamento" INTEGER NOT NULL,
    "ano_vigente" INTEGER NOT NULL,
    "data_pagamento_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ipva_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VeiculoPessoa" (
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "VeiculoPessoa_pkey" PRIMARY KEY ("userId","vehicleId")
);

-- CreateTable
CREATE TABLE "Infracoes" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "pontos" INTEGER NOT NULL,

    CONSTRAINT "Infracoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpf_key" ON "Pessoa"("cpf");

-- AddForeignKey
ALTER TABLE "Cnh" ADD CONSTRAINT "Cnh_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ipva" ADD CONSTRAINT "Ipva_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeiculoPessoa" ADD CONSTRAINT "VeiculoPessoa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VeiculoPessoa" ADD CONSTRAINT "VeiculoPessoa_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infracoes" ADD CONSTRAINT "Infracoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Infracoes" ADD CONSTRAINT "Infracoes_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "Veiculo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
