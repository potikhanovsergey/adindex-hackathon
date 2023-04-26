import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Stack, Title, Group, Paper, Text, TextInput } from "@mantine/core"
import { useQuery } from "@blitzjs/rpc"
import VacancyCard, { ExtendedVacancy } from "src/vacancy/components/VacancyCard"
import getVacancies from "src/vacancy/queries/getVacancies"
import { Suspense } from "react"
import { IconSearch } from "@tabler/icons-react"

const AllVacancies = () => {
  const [vacancies] = useQuery(getVacancies, {
    include: {
      company: true,
    },
  })

  return (
    <Stack w="100%">
      {vacancies.map((vacancy) => (
        <VacancyCard vacancy={vacancy as ExtendedVacancy} key={vacancy.id} withUserButton={true} />
      ))}
    </Stack>
  )
}

const VacanciesPage: BlitzPage = () => {
  return (
    <Layout>
      <Title mb="md">Вакансии</Title>
      <Group noWrap align="flex-start">
        <Paper p="sm">
          <Text>Фильтры</Text>
          <TextInput
            label="Поиск по названию"
            placeholder="Разработчик..."
            icon={<IconSearch size={16} />}
          />
        </Paper>
        <Suspense>
          <AllVacancies />
        </Suspense>
      </Group>
    </Layout>
  )
}

export default VacanciesPage
