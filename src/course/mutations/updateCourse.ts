import db, { Prisma } from "db"

export default async function updateCourse(input: Prisma.CourseUpdateArgs) {
  return await db.course.update(input)
}
