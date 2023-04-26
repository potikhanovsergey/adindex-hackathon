import { BlitzPage } from "@blitzjs/next"
import { Box, Title } from "@mantine/core"
import { GetServerSideProps } from "next"
import Layout from "src/core/layouts/Layout"
import EventHeader from "src/event/components/EventHeader"
import { getEventSSP } from "src/event/getSSP"
import { ExtendedEvent } from "src/event/types"

const EventPage: BlitzPage = ({ event }: { event: ExtendedEvent }) => {
  return (
    <Layout>
      <EventHeader event={event} />

      {event.about && (
        <Box mb="md">
          <Title size={24}>О событии</Title>
          <div dangerouslySetInnerHTML={{ __html: event.about || "" }} />
        </Box>
      )}

      {event.rules && (
        <Box mb="md">
          <Title size={24}>Правила</Title>
          <div dangerouslySetInnerHTML={{ __html: event.rules || "" }} />
        </Box>
      )}

      {event.contacts && (
        <Box mb="md">
          <Title size={24}>Контакты</Title>
          <div dangerouslySetInnerHTML={{ __html: event.contacts || "" }} />
        </Box>
      )}
    </Layout>
  )
}

export default EventPage

export const getServerSideProps: GetServerSideProps = getEventSSP
