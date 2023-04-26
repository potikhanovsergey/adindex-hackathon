import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Select, Stack, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { EventType } from "db"
import { useRouter } from "next/router"
import { FC } from "react"
import createEvent from "src/event/mutations/createEvent"
import getEvents from "src/event/queries/getEvents"
import { EVENT_TYPE_DATA } from "src/event/utils"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

const initialValues = {
  type: null as EventType | null,
  name: "",
  startDate: null as Date | null,
  endDate: null as Date | null,
}

const CreateEventForm: FC = () => {
  const user = useCurrentUser()

  const form = useForm({
    initialValues,
    validate: {},
  })

  const [createEventMutation, { isLoading: isCreating }] = useMutation(createEvent)
  const router = useRouter()

  const handleSubmit = form.onSubmit(async (data) => {
    if (user?.company && data.endDate && data.startDate && data.type !== null) {
      try {
        const response = await createEventMutation({
          data: {
            name: data.name,
            startDate: data.startDate,
            endDate: data.startDate,
            type: data.type,
            companyId: user.company.id,
          },
        })
        await invalidateQuery(getEvents)
        form.setValues(initialValues)
        // void router.push(Routes.EditCoursePage({ id: response.id }))
      } catch (error) {
        notifications.show({
          withCloseButton: true,
          autoClose: false,
          title: "Что-то пошло не так при создании события",
          message: error?.toString?.(),
          color: "red",
        })
      }
    }
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack mb="md">
        <TextInput required label="Название события" {...form.getInputProps("name")} />
        <Select
          required
          data={EVENT_TYPE_DATA}
          label="Тип события"
          {...form.getInputProps("type")}
        />
        <DateInput required label="Дата начала" {...form.getInputProps("startDate")} />
        <DateInput required label="Дата завершения" {...form.getInputProps("endDate")} />
      </Stack>

      <Button loading={isCreating} type="submit">
        Создать событие
      </Button>
    </form>
  )
}

export default CreateEventForm
