/*
  Warnings:

  - Changed the type of `ipva_quitado` on the `vehicles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "ipva_quitado",
ADD COLUMN     "ipva_quitado" BOOLEAN NOT NULL;
