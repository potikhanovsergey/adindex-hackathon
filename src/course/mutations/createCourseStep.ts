import db, { Prisma } from "db"

export default async function createCourseStep(input: Prisma.CourseStepCreateArgs) {
  return await db.courseStep.create(input)
}
