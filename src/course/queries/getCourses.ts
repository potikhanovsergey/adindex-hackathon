import db, { Prisma } from "db"

export default async function getCourses(input: Prisma.CourseFindManyArgs) {
  return await db.course.findMany(input)
}
