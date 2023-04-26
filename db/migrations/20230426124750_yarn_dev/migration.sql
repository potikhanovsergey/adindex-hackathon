-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('HIDDEN', 'WAITING', 'ONGOING', 'PASSED');

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "status" "EventStatus" NOT NULL DEFAULT 'HIDDEN';
