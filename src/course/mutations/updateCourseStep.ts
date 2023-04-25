import db, { Prisma } from "db"

export default async function updateCourseStep(input: Prisma.CourseStepUpdateArgs) {
  return await db.courseStep.update(input)
}
