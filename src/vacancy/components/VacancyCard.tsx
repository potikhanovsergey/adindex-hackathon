import { Routes } from "@blitzjs/next"
import { Text, Paper, Button, Group, Avatar } from "@mantine/core"
import { Company, Vacancy } from "@prisma/client"
import Link from "src/core/Link"

export interface ExtendedVacancy extends Vacancy {
  company: Company
}

const VacancyCard = ({
  vacancy,
  withUserButton = false,
}: {
  vacancy: ExtendedVacancy
  withUserButton?: boolean
}) => {
  return (
    <Paper p="sm">
      <Link href={Routes.VacancyPage({ id: vacancy.id })} target="_blank" mb={4}>
        <Text weight="bold">{vacancy.title}</Text>
      </Link>
      <Text size="lg" mb="xs">
        {vacancy.salary} ₽
      </Text>
      <Group position="apart">
        <Group spacing={4}>
          <Avatar size="sm">{vacancy.company.name.substring(0, 1)}</Avatar>
          <Text>{vacancy.company.name}</Text>
        </Group>
        {withUserButton && <Button>Откликнуться</Button>}
      </Group>
    </Paper>
  )
}

export default VacancyCard
