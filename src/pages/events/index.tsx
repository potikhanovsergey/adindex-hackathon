import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Stack, Title, Paper, Text, TextInput, Grid } from "@mantine/core"
import { useQuery } from "@blitzjs/rpc"
import getVacancies from "src/vacancy/queries/getVacancies"
import { Suspense } from "react"
import { IconSearch } from "@tabler/icons-react"

const AllEvents = () => {
  const [events] = useQuery(getVacancies, {
    include: {
      company: true,
    },
  })

  return (
    <Stack w="100%">
      {/* {events.map((vacancy) => (
        <VacancyCard vacancy={vacancy as ExtendedVacancy} key={vacancy.id} withUserButton={true} />
      ))} */}
    </Stack>
  )
}

const EventsPage: BlitzPage = () => {
  return (
    <Layout>
      <Title mb="md">События</Title>
      <Grid>
        <Grid.Col span={3}>
          <Paper p="sm">
            <Text>Фильтры</Text>
            <TextInput
              label="Поиск по названию"
              placeholder="Разработчик..."
              icon={<IconSearch size={16} />}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={9}>
          <Suspense>Events</Suspense>
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default EventsPage
