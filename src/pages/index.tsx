import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import {
  Stack,
  Title,
  Paper,
  Text,
  TextInput,
  Grid,
  SimpleGrid,
  Loader,
  Select,
  MultiSelect,
} from "@mantine/core"
import { useQuery } from "@blitzjs/rpc"
import { Suspense } from "react"
import { IconSearch } from "@tabler/icons-react"
import EventCard from "src/event/components/EventCard"
import { ExtendedEvent } from "src/event/types"
import getEvents from "src/event/queries/getEvents"

export const mockTags = [
  "Цифровой маркетинг",
  "SEO",
  "Контент-маркетинг",
  "Копирайтинг",
  "Продуктовый маркетинг",
  "Маркетинговые исследования",
  "Управление брендом",
  "Реклама",
  "Маркетинг в социальных сетях",
  "Маркетинг с помощью инфлюенсеров",
  "Маркетинговая стратегия",
  "Развитие бизнеса",
  "Аналитика данных",
  "Email-маркетинг",
  "Мобильный маркетинг",
  "Маркетинг в поисковых системах",
  "PR",
  "Анализ конкурентов",
  "Управление проектами",
  "Управление продуктом",
  "Аналитика веб-трафика",
  "Реклама в социальных сетях",
  "Ретаргетинг",
]

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
            <MultiSelect label="Фильтровать по тегам" data={mockTags} />
          </Paper>
        </Grid.Col>
        <Grid.Col span={9}>
          <Suspense fallback={<Loader />}>
            <AllEvents />
          </Suspense>
        </Grid.Col>
      </Grid>
    </Layout>
  )
}

export default EventsPage
