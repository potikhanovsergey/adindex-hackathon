import db, { Prisma } from "db"

export default async function createCourse(input: Prisma.CourseCreateArgs) {
  return await db.course.create(input)
}
