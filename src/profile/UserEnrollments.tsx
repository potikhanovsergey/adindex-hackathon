import { useQuery } from "@blitzjs/rpc"
import { CourseEnrollment, Course, User } from "@prisma/client"
import { FC } from "react"
import getEnrollments from "src/enrollment/queries/getEnrollments"
import { Group, Paper, Stack, Text } from "@mantine/core"
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
    <Stack spacing={2}>
      {enrollments.map((enrollment: ExtendedEnrollment) => (
        <Link href="/" key={enrollment.courseId} target="_blank" w="fit-content">
          <Text>{enrollment.course.name}</Text>
        </Link>
      ))}
    </Stack>
  )
}

export default UserEnrollments
