import db, { Prisma } from "db"

export default async function deleteCourseStep(input: Prisma.CourseStepDeleteArgs) {
  return await db.courseStep.delete(input)
}
