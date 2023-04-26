import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Stack, Title, Paper, Text, TextInput, Grid, SimpleGrid } from "@mantine/core"
import { useQuery } from "@blitzjs/rpc"
import { Suspense } from "react"
import { IconSearch } from "@tabler/icons-react"
import EventCard from "src/event/components/EventCard"
import { ExtendedEvent } from "src/event/types"
import getEvents from "src/event/queries/getEvents"

const AllEvents = () => {
  const [events] = useQuery(getEvents, {
    include: {
      company: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })

  return (
    <SimpleGrid cols={2}>
      {events.map((event) => (
        <EventCard event={event as ExtendedEvent} key={event.id} />
      ))}
    </SimpleGrid>
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
              placeholder="Лекция..."
              icon={<IconSearch size={16} />}
            />
          </Paper>
        </Grid.Col>
        <Grid.Col span={9}>
          <Suspense>
            <AllEvents />
          </Suspense>
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default EventsPage
