import { Company, Course, CourseEnrollment, CourseTagLink, Tag, User } from "@prisma/client"

export interface ExtendedUser extends User {
  enrollments: (CourseEnrollment & {
    course: Course & { tags: (CourseTagLink & { tag: Tag })[] }
  })[]
  company: Company | null
}
