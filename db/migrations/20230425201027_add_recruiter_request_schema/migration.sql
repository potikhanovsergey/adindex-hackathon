/*
  Warnings:

  - You are about to drop the column `professionId` on the `Flow` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[vacancyId]` on the table `Flow` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `vacancyId` to the `Flow` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Flow" DROP CONSTRAINT "Flow_professionId_fkey";

-- DropIndex
DROP INDEX "Flow_professionId_key";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Flow" DROP COLUMN "professionId",
ADD COLUMN     "vacancyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RecruiterRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "RecruiterRequest_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Flow_vacancyId_key" ON "Flow"("vacancyId");

-- AddForeignKey
ALTER TABLE "RecruiterRequest" ADD CONSTRAINT "RecruiterRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruiterRequest" ADD CONSTRAINT "RecruiterRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
