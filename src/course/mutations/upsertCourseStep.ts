import db, { Prisma } from "db"

export default async function upsertCourseStep(input: Prisma.CourseStepUpsertArgs) {
  return await db.courseStep.upsert(input)
}
