/*
  Warnings:

  - You are about to drop the column `paymentDateDate` on the `ipvas` table. All the data in the column will be lost.
  - Changed the type of `paymentDate` on the `ipvas` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "ipvas" DROP COLUMN "paymentDateDate",
DROP COLUMN "paymentDate",
ADD COLUMN     "paymentDate" TIMESTAMP(3) NOT NULL;
