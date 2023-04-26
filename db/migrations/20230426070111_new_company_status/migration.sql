-- AlterEnum
ALTER TYPE "CompanyStatus" ADD VALUE 'rejected';

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "verificationRejectReason" TEXT,
ALTER COLUMN "status" SET DEFAULT 'unverified';
