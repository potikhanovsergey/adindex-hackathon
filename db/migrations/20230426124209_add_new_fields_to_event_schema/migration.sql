/*
  Warnings:

  - You are about to drop the column `date` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `websiteUrl` on the `Event` table. All the data in the column will be lost.
  - Added the required column `endDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startDate` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `previewImageUrl` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('LECTURE', 'FORUM', 'COMPETITION');

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "date",
DROP COLUMN "description",
DROP COLUMN "websiteUrl",
ADD COLUMN     "about" TEXT,
ADD COLUMN     "contacts" TEXT,
ADD COLUMN     "endDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "rules" TEXT,
ADD COLUMN     "startDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "type" "EventType" NOT NULL,
ALTER COLUMN "previewImageUrl" SET NOT NULL;
