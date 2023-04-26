import { Routes } from "@blitzjs/next"
import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Paper, Stack, Group, Button, Image, Text, Tooltip, Box } from "@mantine/core"
import { IconVideo, IconArticle, IconPencil, IconCertificate } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"
import createEnrollment from "src/enrollment/mutations/createEnrollment"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import getCurrentUser from "src/users/queries/getCurrentUser"
import { ExtendedCourse } from "../types"

const courseContentsMock = [
  {
    icon: <IconVideo stroke={1.5} />,
    label: "13 видео лекций",
  },
  {
    icon: <IconArticle stroke={1.5} />,
    label: "7 статей",
  },
  {
    icon: <IconPencil stroke={1.5} />,
    label: "10 тестов",
  },
  {
    icon: <IconCertificate stroke={1.5} />,
    label: "2 итоговых проекта",
  },
]

const CourseInfoCard = ({ course }: { course: ExtendedCourse }) => {
  const [createEnrollmentMutation, { isLoading: isEnrollmentCreating }] =
    useMutation(createEnrollment)

  const user = useCurrentUser()
  const router = useRouter()

  const handleSubmit = async () => {
    if (user) {
      try {
        await createEnrollmentMutation({
          data: {
            courseId: course.id,
            userId: user.id,
          },
        })
        await invalidateQuery(getCurrentUser)
      } catch (error) {}
    }
  }

  const isUserEnrolled = Boolean(
    user && user.enrollments.some((enrollment) => enrollment.courseId === course.id)
  )

  const tooltipLabel = !user ? "Войдите в аккаунт для записи на курс" : ""

  return (
    <Paper pos="sticky" h="fit-content" top="calc(2rem + var(--mantine-header-height))">
      <Image
        src="https://lenskrayon.ru/images/news/2021-05-25_Poezd/Photo.jpg"
        alt="course preview"
        fit="cover"
        h="100%"
        mah={200}
      />
      <Stack p="md" spacing={4}>
        {courseContentsMock.map((content) => (
          <Group noWrap spacing="xs" key={content.label}>
            {content.icon}
            <Text>{content.label}</Text>
          </Group>
        ))}
        {isUserEnrolled ? (
          <Button
            mt="md"
            component={Link}
            href={Routes.CourseLearn({ id: course.id, stepId: course.sections[0]?.steps[0].id })}
          >
            Перейти к курсу
          </Button>
        ) : (
          <Tooltip label={tooltipLabel} disabled={Boolean(user && !isUserEnrolled)}>
            <Box mt="md">
              <Button
                disabled={!user || isUserEnrolled}
                onClick={handleSubmit}
                fullWidth
                loading={isEnrollmentCreating}
              >
                Записаться на курс
              </Button>
            </Box>
          </Tooltip>
        )}
      </Stack>
    </Paper>
  )
}

export default CourseInfoCard
