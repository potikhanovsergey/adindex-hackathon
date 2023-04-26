import { Routes } from "@blitzjs/next"
import { Button, Group, Paper, Stack } from "@mantine/core"
import { UserVacancyRequest, Vacancy } from "@prisma/client"
import { ExtendedRequest } from "src/company/components/CompanyRequests"
import Link from "src/core/Link"

const RequestCard = ({ request }: { request: ExtendedRequest }) => {
  return (
    <Paper p="sm">
      <Group position="apart">
        <Stack>
          <Link href={Routes.VacancyPage({ id: request.vacancyId })} target="_blank">
            {request.vacancy.title}
          </Link>
          <Link href={Routes.ProfilePage({ id: request.userId })} target="_blank">
            {request.user.firstName} {request.user.lastName}
          </Link>
        </Stack>
        <Stack>
          <Button color="red">Принять</Button>
          <Button>Отклонить</Button>
        </Stack>
      </Group>
      <div dangerouslySetInnerHTML={{ __html: request.cv || "" }} />
    </Paper>
  )
}

export default RequestCard
