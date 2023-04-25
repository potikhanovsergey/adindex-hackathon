import db, { Prisma } from "db"

export default async function deleteCourseSection(input: Prisma.CourseSectionDeleteArgs) {
  return await db.courseSection.delete(input)
}
