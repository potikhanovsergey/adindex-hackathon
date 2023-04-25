import { useQuery } from "@blitzjs/rpc"
import { CourseEnrollment, Course, User } from "@prisma/client"
import { FC } from "react"
import getEnrollments from "src/enrollment/queries/getEnrollments"
import { Text } from "@mantine/core"
import Link from "src/core/Link"

interface ExtendedEnrollment extends CourseEnrollment {
  course: Course
}

interface UserEnrollmentsProps {
  user: User
}

const UserEnrollments: FC<UserEnrollmentsProps> = ({ user }) => {
  const [enrollments] = useQuery(getEnrollments, {
    where: { userId: user.id },
    include: { course: true },
  })

  return (
    <>
      {enrollments.map((enrollment: ExtendedEnrollment) => (
        <Link key={enrollment.courseId} href="/" target="_blank">
          <Text>{enrollment.course.name}</Text>
        </Link>
      ))}
    </>
  )
}

export default UserEnrollments
