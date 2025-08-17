/*
  Warnings:

  - The primary key for the `LancheIngrediente` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ingrediente_id` on the `LancheIngrediente` table. All the data in the column will be lost.
  - You are about to drop the column `lanche_id` on the `LancheIngrediente` table. All the data in the column will be lost.
  - Added the required column `ingredienteId` to the `LancheIngrediente` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lancheId` to the `LancheIngrediente` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."LancheIngrediente" DROP CONSTRAINT "LancheIngrediente_ingrediente_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."LancheIngrediente" DROP CONSTRAINT "LancheIngrediente_lanche_id_fkey";

-- AlterTable
ALTER TABLE "public"."Lanche" ADD COLUMN     "active" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "public"."LancheIngrediente" DROP CONSTRAINT "LancheIngrediente_pkey",
DROP COLUMN "ingrediente_id",
DROP COLUMN "lanche_id",
ADD COLUMN     "ingredienteId" INTEGER NOT NULL,
ADD COLUMN     "lancheId" INTEGER NOT NULL,
ADD CONSTRAINT "LancheIngrediente_pkey" PRIMARY KEY ("lancheId", "ingredienteId");

-- CreateTable
CREATE TABLE "public"."Admin" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_email_key" ON "public"."Admin"("email");

-- AddForeignKey
ALTER TABLE "public"."LancheIngrediente" ADD CONSTRAINT "LancheIngrediente_lancheId_fkey" FOREIGN KEY ("lancheId") REFERENCES "public"."Lanche"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."LancheIngrediente" ADD CONSTRAINT "LancheIngrediente_ingredienteId_fkey" FOREIGN KEY ("ingredienteId") REFERENCES "public"."Ingrediente"("id") ON DELETE CASCADE ON UPDATE CASCADE;
