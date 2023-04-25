import db, { Prisma } from "db"

export default async function createEnrollment(input: Prisma.CourseEnrollmentCreateArgs) {
  return await db.courseEnrollment.create(input)
}
