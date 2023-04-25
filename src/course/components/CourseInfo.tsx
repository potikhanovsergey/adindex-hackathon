import { Stack, Title, Group, Text } from "@mantine/core"
import { Course } from "@prisma/client"
import { IconChartBar, IconClockHour5 } from "@tabler/icons-react"

const CourseInfo = ({ course }: { course: Course }) => {
  return (
    <Stack spacing="xs">
      <Title mb="md">{course.name}</Title>
      <Text maw={728}>{course.description || course.shortDescription}</Text>
      <Text>Преподаватели: Иванов И.И., Иванова И.И.</Text>
      <Group noWrap spacing="xs">
        <IconChartBar color="red" stroke={1.5} />
        <Text>Уровень сложности: высокий</Text>
      </Group>
      <Group noWrap spacing="xs">
        <IconClockHour5 stroke={1.5} />
        <Text>Время прохождения ~2 месяца</Text>
      </Group>
    </Stack>
  )
}

export default CourseInfo
