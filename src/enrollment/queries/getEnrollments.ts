import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getEnrollments(input: Prisma.CourseEnrollmentFindManyArgs) {
  const enrollments = await db.courseEnrollment.findMany(input)

  return enrollments
}
