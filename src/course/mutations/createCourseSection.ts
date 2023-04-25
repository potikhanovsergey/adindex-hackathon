import db, { Prisma } from "db"

export default async function createCourseSection(input: Prisma.CourseSectionCreateArgs) {
  return await db.courseSection.create(input)
}
