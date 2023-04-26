-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'RECRUITER', 'ADMIN');

-- CreateEnum
CREATE TYPE "CompanyStatus" AS ENUM ('verified', 'unverified', 'rejected');

-- CreateEnum
CREATE TYPE "InvitationRequestStatus" AS ENUM ('OPENED', 'REJECTED', 'ACCEPTED');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- CreateEnum
CREATE TYPE "VacancyStatus" AS ENUM ('OPENED', 'HIDDEN', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('LECTURE', 'FORUM', 'COMPETITION');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('HIDDEN', 'WAITING', 'ONGOING', 'PASSED');

-- CreateEnum
CREATE TYPE "CourseStepType" AS ENUM ('text', 'video', 'test', 'review');

-- CreateTable
CREATE TABLE "RecruiterRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "RecruiterRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Company" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "status" "CompanyStatus" NOT NULL DEFAULT 'unverified',
    "websiteUrl" TEXT,
    "email" TEXT,
    "telegramId" TEXT,
    "phoneNumber" TEXT,
    "verificationRejectReason" TEXT,
    "description" TEXT,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserInvitation" (
    "id" SERIAL NOT NULL,
    "status" "InvitationRequestStatus" NOT NULL DEFAULT 'OPENED',
    "message" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyId" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,

    CONSTRAINT "UserInvitation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserVacancyRequest" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "vacancyId" INTEGER NOT NULL,
    "cv" TEXT,
    "status" "InvitationRequestStatus" NOT NULL DEFAULT 'OPENED',
    "companyAnswerMessage" TEXT,

    CONSTRAINT "UserVacancyRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "patronymic" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "avatarUrl" TEXT,
    "companyId" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMP(3),
    "handle" TEXT NOT NULL,
    "hashedSessionToken" TEXT,
    "antiCSRFToken" TEXT,
    "publicData" TEXT,
    "privateData" TEXT,
    "userId" INTEGER,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Token" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "hashedToken" TEXT NOT NULL,
    "type" "TokenType" NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "sentTo" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Flow" (
    "id" SERIAL NOT NULL,
    "visible" BOOLEAN NOT NULL DEFAULT false,
    "vacancyId" INTEGER NOT NULL,

    CONSTRAINT "Flow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Edge" (
    "id" SERIAL NOT NULL,
    "connectionId" TEXT NOT NULL,
    "source" TEXT NOT NULL,
    "target" TEXT NOT NULL,
    "flowId" INTEGER NOT NULL,

    CONSTRAINT "Edge_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Node" (
    "id" SERIAL NOT NULL,
    "nodeId" INTEGER NOT NULL,
    "x" DOUBLE PRECISION NOT NULL,
    "y" DOUBLE PRECISION NOT NULL,
    "courseId" INTEGER NOT NULL,
    "flowId" INTEGER NOT NULL,

    CONSTRAINT "Node_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "salary" DOUBLE PRECISION,
    "status" "VacancyStatus" NOT NULL DEFAULT 'OPENED',
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VacancyTagLink" (
    "vacancyId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "power" INTEGER,

    CONSTRAINT "VacancyTagLink_pkey" PRIMARY KEY ("vacancyId","tagId")
);

-- CreateTable
CREATE TABLE "TagCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "TagCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "categoryId" INTEGER,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseTagLink" (
    "courseId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,

    CONSTRAINT "CourseTagLink_pkey" PRIMARY KEY ("courseId","tagId")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "previewImageUrl" TEXT,
    "demoVideoUrl" TEXT,
    "description" TEXT,
    "companyId" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventTagLink" (
    "eventId" INTEGER NOT NULL,
    "tagId" INTEGER NOT NULL,
    "power" INTEGER NOT NULL,

    CONSTRAINT "EventTagLink_pkey" PRIMARY KEY ("eventId","tagId")
);

-- CreateTable
CREATE TABLE "EventEnrollment" (
    "userId" INTEGER NOT NULL,
    "eventId" INTEGER NOT NULL,

    CONSTRAINT "EventEnrollment_pkey" PRIMARY KEY ("userId","eventId")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" SERIAL NOT NULL,
    "type" "EventType" NOT NULL,
    "status" "EventStatus" NOT NULL DEFAULT 'HIDDEN',
    "name" TEXT NOT NULL,
    "previewImageUrl" TEXT,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "about" TEXT,
    "rules" TEXT,
    "contacts" TEXT,
    "companyId" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseEnrollment" (
    "userId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CourseEnrollment_pkey" PRIMARY KEY ("userId","courseId")
);

-- CreateTable
CREATE TABLE "CourseSection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "index" DOUBLE PRECISION NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "CourseSection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseStep" (
    "id" SERIAL NOT NULL,
    "index" DOUBLE PRECISION NOT NULL,
    "title" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "type" "CourseStepType" NOT NULL,
    "sectionId" INTEGER NOT NULL,

    CONSTRAINT "CourseStep_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseStepContentVideo" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "courseStepId" INTEGER NOT NULL,

    CONSTRAINT "CourseStepContentVideo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseStepContentText" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "courseStepId" INTEGER NOT NULL,

    CONSTRAINT "CourseStepContentText_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseStepResource" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "type" TEXT NOT NULL,

    CONSTRAINT "CourseStepResource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCourseStepStatus" (
    "userId" INTEGER NOT NULL,
    "courseStepId" INTEGER NOT NULL,

    CONSTRAINT "UserCourseStepStatus_pkey" PRIMARY KEY ("userId","courseStepId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "Company"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_handle_key" ON "Session"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Flow_vacancyId_key" ON "Flow"("vacancyId");

-- CreateIndex
CREATE UNIQUE INDEX "TagCategory_name_key" ON "TagCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE UNIQUE INDEX "CourseStepContentVideo_courseStepId_key" ON "CourseStepContentVideo"("courseStepId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseStepContentText_courseStepId_key" ON "CourseStepContentText"("courseStepId");

-- AddForeignKey
ALTER TABLE "RecruiterRequest" ADD CONSTRAINT "RecruiterRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecruiterRequest" ADD CONSTRAINT "RecruiterRequest_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInvitation" ADD CONSTRAINT "UserInvitation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInvitation" ADD CONSTRAINT "UserInvitation_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserInvitation" ADD CONSTRAINT "UserInvitation_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVacancyRequest" ADD CONSTRAINT "UserVacancyRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserVacancyRequest" ADD CONSTRAINT "UserVacancyRequest_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacancyTagLink" ADD CONSTRAINT "VacancyTagLink_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VacancyTagLink" ADD CONSTRAINT "VacancyTagLink_vacancyId_fkey" FOREIGN KEY ("vacancyId") REFERENCES "Vacancy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tag" ADD CONSTRAINT "Tag_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "TagCategory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTagLink" ADD CONSTRAINT "CourseTagLink_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseTagLink" ADD CONSTRAINT "CourseTagLink_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTagLink" ADD CONSTRAINT "EventTagLink_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventTagLink" ADD CONSTRAINT "EventTagLink_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEnrollment" ADD CONSTRAINT "EventEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEnrollment" ADD CONSTRAINT "EventEnrollment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseEnrollment" ADD CONSTRAINT "CourseEnrollment_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSection" ADD CONSTRAINT "CourseSection_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStep" ADD CONSTRAINT "CourseStep_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "CourseSection"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStepContentVideo" ADD CONSTRAINT "CourseStepContentVideo_courseStepId_fkey" FOREIGN KEY ("courseStepId") REFERENCES "CourseStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStepContentText" ADD CONSTRAINT "CourseStepContentText_courseStepId_fkey" FOREIGN KEY ("courseStepId") REFERENCES "CourseStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseStepStatus" ADD CONSTRAINT "UserCourseStepStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseStepStatus" ADD CONSTRAINT "UserCourseStepStatus_courseStepId_fkey" FOREIGN KEY ("courseStepId") REFERENCES "CourseStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;
