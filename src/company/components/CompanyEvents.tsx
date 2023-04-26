import { useQuery } from "@blitzjs/rpc"
import { SimpleGrid, Stack } from "@mantine/core"
import { Company } from "@prisma/client"
import EventCard from "src/event/components/EventCard"
import getEvents from "src/event/queries/getEvents"

const CompanyEvents = ({ company }: { company: Company }) => {
  const [events] = useQuery(getEvents, {
    where: {
      companyId: {
        equals: company.id,
      },
    },
    include: {
      company: true,
    },
  })

  return (
    <SimpleGrid cols={3}>
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </SimpleGrid>
  )
}

export default CompanyEvents
