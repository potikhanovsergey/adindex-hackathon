import { Routes } from "@blitzjs/next"
import { Paper, Image, Stack, Text, Group, Button } from "@mantine/core"
import { Course } from "@prisma/client"
import { IconChartBar, IconClockHour5 } from "@tabler/icons-react"
import { useRouter } from "next/router"
import Logo from "src/core/layouts/Logo"

const CourseCard = ({ course }: { course: Course }) => {
  const router = useRouter()

  return (
    <Paper p={0} display="flex" sx={{ flexDirection: "column" }}>
      <Image
        src={
          course.previewImageUrl ||
          "https://matchboxbootcamp.com/assets/frontend/images/courseplaceholder.png"
        }
        alt="course preview"
      />
      <Stack p="sm" spacing={0}>
        <Text weight="bold" mb="sm">
          {course.name}
        </Text>
        <Group noWrap spacing="xs">
          <IconChartBar color="red" stroke={1.5} size={16} />
          <Text size="sm">Уровень сложности: высокий</Text>
        </Group>
        <Group noWrap spacing="xs">
          <IconClockHour5 stroke={1.5} size={16} />
          <Text size="sm">Время прохождения ~2 месяца</Text>
        </Group>
      </Stack>
      <Button
        mt="auto"
        mx="sm"
        mb="sm"
        onClick={() => router.push(Routes.CoursePage({ id: course.id }))}
      >
        Подробнее
      </Button>
    </Paper>
  )
}

export default CourseCard
