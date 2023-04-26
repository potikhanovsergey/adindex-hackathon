import { BlitzPage, Routes } from "@blitzjs/next"
import { Container, Title, Box, Center, SegmentedControl, Image } from "@mantine/core"
import { GetServerSideProps } from "next"
import {
  IconInfoSquareFilled,
  IconTooltip,
  IconAlertTriangleFilled,
  IconAddressBook,
} from "@tabler/icons-react"
import { useState } from "react"
import Link from "src/core/Link"
import { EventPageProps } from "../../types"
import { getEventSSP } from "src/event/getSSP"
import EventLayout from "src/core/layouts/EventLayout"
import EditEventForm from "src/event/components/Constructor/EditEventForm"
import UploadNewPhoto from "src/event/components/Constructor/UploadNewPhoto"
import { supabase } from "lib/supabase"
import EventRichTextEdit from "src/event/components/Constructor/EventRichTextEdit"

const EditEventPage: BlitzPage<EventPageProps> = ({ event }) => {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <EventLayout>
      <Container>
        <Title size="h2" mb="lg">
          Редактирование события{" "}
          <Link span href={Routes.CoursePage({ id: event.id })} target="_blank" size="xl">
            {event.name}
          </Link>
        </Title>

        <SegmentedControl
          value={activeTab}
          onChange={setActiveTab}
          mb="md"
          data={[
            {
              value: "description",
              label: (
                <Center>
                  <IconInfoSquareFilled size="1rem" />
                  <Box ml={10}>Основная информация</Box>
                </Center>
              ),
            },
            {
              value: "about",
              label: (
                <Center>
                  <IconTooltip size="1rem" />
                  <Box ml={10}>О событии</Box>
                </Center>
              ),
            },
            {
              value: "rules",
              label: (
                <Center>
                  <IconAlertTriangleFilled size="1rem" />
                  <Box ml={10}>Правила</Box>
                </Center>
              ),
            },
            {
              value: "contacts",
              label: (
                <Center>
                  <IconAddressBook size="1rem" />
                  <Box ml={10}>Контакты</Box>
                </Center>
              ),
            },
          ]}
        />

        <Box display={activeTab === "description" ? "block" : "none"}>
          <Box>
            <Title order={3} mb="sm">
              Превью события
            </Title>
            <Image
              mb="xs"
              width={120}
              height={120}
              src={
                event.previewImageUrl
                  ? supabase.storage.from("images").getPublicUrl(event.previewImageUrl).data
                      .publicUrl || ""
                  : ""
              }
              alt={event.name}
            />
            <UploadNewPhoto mb="xl" event={event} />
          </Box>
          <Box>
            <Title order={3} mb={4}>
              Основные данные
            </Title>
            <EditEventForm event={event} />
          </Box>
        </Box>

        <Box display={activeTab === "about" ? "block" : "none"}>
          <EventRichTextEdit
            eventId={event.id}
            slug="about"
            content={event.about}
            label="О событии"
          />
        </Box>
        <Box display={activeTab === "rules" ? "block" : "none"}>
          <EventRichTextEdit
            eventId={event.id}
            slug="rules"
            content={event.rules}
            label="Правила"
          />
        </Box>
        <Box display={activeTab === "contacts" ? "block" : "none"}>
          <EventRichTextEdit
            eventId={event.id}
            slug="contacts"
            content={event.contacts}
            label="Контакты"
          />
        </Box>
      </Container>
    </EventLayout>
  )
}

export default EditEventPage

export const getServerSideProps: GetServerSideProps = getEventSSP
