import db, { Prisma } from "db"

export default async function updateCourseSection(input: Prisma.CourseSectionUpdateArgs) {
  return await db.courseSection.update(input)
}
