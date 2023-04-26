import { useQuery } from "@blitzjs/rpc"
import { SimpleGrid, Stack } from "@mantine/core"
import { Company } from "@prisma/client"
import EventCard from "src/event/components/EventCard"
import getEvents from "src/event/queries/getEvents"
import { ExtendedCompany } from "../types"

const CompanyEvents = ({ company }: { company: ExtendedCompany }) => {
  return (
    <SimpleGrid cols={3}>
      {company.events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </SimpleGrid>
  )
}

export default CompanyEvents
