-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'MODERATOR', 'ADMIN');

-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('RESET_PASSWORD');

-- CreateEnum
CREATE TYPE "CourseStepType" AS ENUM ('text', 'video', 'test', 'review');

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
    "professionId" INTEGER NOT NULL,

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
CREATE TABLE "Profession" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Profession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionCourseLink" (
    "professionId" INTEGER NOT NULL,
    "courseId" INTEGER NOT NULL,

    CONSTRAINT "ProfessionCourseLink_pkey" PRIMARY KEY ("professionId","courseId")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "shortDescription" TEXT NOT NULL,
    "previewImageUrl" TEXT,
    "demoVideoUrl" TEXT,
    "description" TEXT,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "CourseStepQuestion" (
    "id" SERIAL NOT NULL,
    "courseStepId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "questions" TEXT NOT NULL,

    CONSTRAINT "CourseStepQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseStepQuestionUpvote" (
    "courseStepQuestionId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "CourseStepQuestionUpvote_pkey" PRIMARY KEY ("courseStepQuestionId","userId")
);

-- CreateTable
CREATE TABLE "CourseStepQuestionReply" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "message" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
    "courseStepQuestionId" INTEGER NOT NULL,

    CONSTRAINT "CourseStepQuestionReply_pkey" PRIMARY KEY ("id")
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
    "completed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserCourseStepStatus_pkey" PRIMARY KEY ("userId","courseStepId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Session_handle_key" ON "Session"("handle");

-- CreateIndex
CREATE UNIQUE INDEX "Token_hashedToken_type_key" ON "Token"("hashedToken", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Flow_professionId_key" ON "Flow"("professionId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseStepContentVideo_courseStepId_key" ON "CourseStepContentVideo"("courseStepId");

-- CreateIndex
CREATE UNIQUE INDEX "CourseStepContentText_courseStepId_key" ON "CourseStepContentText"("courseStepId");

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Flow" ADD CONSTRAINT "Flow_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Edge" ADD CONSTRAINT "Edge_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Node" ADD CONSTRAINT "Node_flowId_fkey" FOREIGN KEY ("flowId") REFERENCES "Flow"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionCourseLink" ADD CONSTRAINT "ProfessionCourseLink_professionId_fkey" FOREIGN KEY ("professionId") REFERENCES "Profession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionCourseLink" ADD CONSTRAINT "ProfessionCourseLink_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

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
ALTER TABLE "CourseStepQuestion" ADD CONSTRAINT "CourseStepQuestion_courseStepId_fkey" FOREIGN KEY ("courseStepId") REFERENCES "CourseStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStepQuestion" ADD CONSTRAINT "CourseStepQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStepQuestionUpvote" ADD CONSTRAINT "CourseStepQuestionUpvote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStepQuestionUpvote" ADD CONSTRAINT "CourseStepQuestionUpvote_courseStepQuestionId_fkey" FOREIGN KEY ("courseStepQuestionId") REFERENCES "CourseStepQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStepQuestionReply" ADD CONSTRAINT "CourseStepQuestionReply_courseStepQuestionId_fkey" FOREIGN KEY ("courseStepQuestionId") REFERENCES "CourseStepQuestion"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseStepQuestionReply" ADD CONSTRAINT "CourseStepQuestionReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseStepStatus" ADD CONSTRAINT "UserCourseStepStatus_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCourseStepStatus" ADD CONSTRAINT "UserCourseStepStatus_courseStepId_fkey" FOREIGN KEY ("courseStepId") REFERENCES "CourseStep"("id") ON DELETE CASCADE ON UPDATE CASCADE;
