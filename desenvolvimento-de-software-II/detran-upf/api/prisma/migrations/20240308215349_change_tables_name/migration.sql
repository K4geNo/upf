/*
  Warnings:

  - You are about to drop the `Infracoes` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ipva` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Pessoa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Veiculo` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VeiculoPessoa` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cnh" DROP CONSTRAINT "Cnh_userId_fkey";

-- DropForeignKey
ALTER TABLE "Infracoes" DROP CONSTRAINT "Infracoes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Infracoes" DROP CONSTRAINT "Infracoes_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "Ipva" DROP CONSTRAINT "Ipva_vehicleId_fkey";

-- DropForeignKey
ALTER TABLE "VeiculoPessoa" DROP CONSTRAINT "VeiculoPessoa_userId_fkey";

-- DropForeignKey
ALTER TABLE "VeiculoPessoa" DROP CONSTRAINT "VeiculoPessoa_vehicleId_fkey";

-- DropTable
DROP TABLE "Infracoes";

-- DropTable
DROP TABLE "Ipva";

-- DropTable
DROP TABLE "Pessoa";

-- DropTable
DROP TABLE "Veiculo";

-- DropTable
DROP TABLE "VeiculoPessoa";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "nome_pessoa" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "descricao_endereco" TEXT,
    "data_nascimento" TIMESTAMP(3) NOT NULL,
    "telefone" INTEGER,
    "email" TEXT,
    "pcd" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
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

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ipvas" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data_pagamento" INTEGER NOT NULL,
    "ano_vigente" INTEGER NOT NULL,
    "data_pagamento_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ipvas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_vehicles" (
    "userId" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,

    CONSTRAINT "user_vehicles_pkey" PRIMARY KEY ("userId","vehicleId")
);

-- CreateTable
CREATE TABLE "infracoes" (
    "id" TEXT NOT NULL,
    "vehicleId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "valor" DOUBLE PRECISION NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "pontos" INTEGER NOT NULL,

    CONSTRAINT "infracoes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_cpf_key" ON "users"("cpf");

-- AddForeignKey
ALTER TABLE "Cnh" ADD CONSTRAINT "Cnh_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ipvas" ADD CONSTRAINT "ipvas_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_vehicles" ADD CONSTRAINT "user_vehicles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_vehicles" ADD CONSTRAINT "user_vehicles_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infracoes" ADD CONSTRAINT "infracoes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "infracoes" ADD CONSTRAINT "infracoes_vehicleId_fkey" FOREIGN KEY ("vehicleId") REFERENCES "vehicles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
