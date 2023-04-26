import { Loader, Title } from "@mantine/core"
import { FC, Suspense } from "react"
import EventLayout from "src/core/layouts/EventLayout"
import CreateEventForm from "src/event/components/Constructor/CreateEventForm"

const CreateEventPage: FC = () => {
  return (
    <EventLayout>
      <Title size="h2" mb="sm">
        Создание события
      </Title>
      <Suspense fallback={<Loader />}>
        <CreateEventForm />
      </Suspense>
    </EventLayout>
  )
}

export default CreateEventPage
