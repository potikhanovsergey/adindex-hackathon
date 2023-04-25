/*
  Warnings:

  - You are about to drop the `CourseStepQuestion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseStepQuestionReply` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CourseStepQuestionUpvote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CourseStepQuestion" DROP CONSTRAINT "CourseStepQuestion_courseStepId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStepQuestion" DROP CONSTRAINT "CourseStepQuestion_userId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStepQuestionReply" DROP CONSTRAINT "CourseStepQuestionReply_courseStepQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStepQuestionReply" DROP CONSTRAINT "CourseStepQuestionReply_userId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStepQuestionUpvote" DROP CONSTRAINT "CourseStepQuestionUpvote_courseStepQuestionId_fkey";

-- DropForeignKey
ALTER TABLE "CourseStepQuestionUpvote" DROP CONSTRAINT "CourseStepQuestionUpvote_userId_fkey";

-- DropTable
DROP TABLE "CourseStepQuestion";

-- DropTable
DROP TABLE "CourseStepQuestionReply";

-- DropTable
DROP TABLE "CourseStepQuestionUpvote";
