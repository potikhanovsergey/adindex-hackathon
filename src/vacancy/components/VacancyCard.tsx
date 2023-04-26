import { Text, Paper, Button, Group, Avatar } from "@mantine/core"
import { Company, Vacancy } from "@prisma/client"

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
      <Text weight="bold">{vacancy.title}</Text>
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
