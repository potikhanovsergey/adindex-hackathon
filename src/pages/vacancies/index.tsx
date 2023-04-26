import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Stack, Title } from "@mantine/core"
import { useQuery } from "@blitzjs/rpc"
import VacancyCard, { ExtendedVacancy } from "src/vacancy/components/VacancyCard"
import getVacancies from "src/vacancy/queries/getVacancies"
import { Suspense } from "react"

const AllVacancies = () => {
  const [vacancies] = useQuery(getVacancies, {
    include: {
      company: true,
    },
  })

  return (
    <Stack>
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
      <Suspense>
        <AllVacancies />
      </Suspense>
    </Layout>
  )
}

export default VacanciesPage
