import { useMutation } from "@blitzjs/rpc"
import { Button, Select, Stack, TextInput } from "@mantine/core"
import { DateInput } from "@mantine/dates"
import { useForm } from "@mantine/form"
import { FC, useEffect } from "react"
import updateEvent from "src/event/mutations/updateEvent"
import { EventPageProps } from "src/event/types"
import { EVENT_STATUS_DATA, EVENT_TYPE_DATA } from "src/event/utils"

const EditEventForm: FC<EventPageProps> = ({ event }) => {
  const form = useForm()

  useEffect(() => {
    form.setValues({
      name: event.name,
      startDate: new Date(event.startDate),
      endDate: new Date(event.endDate),
      type: event.type,
      status: event.status,
    })
  }, [event])

  const [updateEventMutation, { isLoading: isUpdating }] = useMutation(updateEvent)

  const handleSubmit = form.onSubmit(async (data) => {
    const response = await updateEventMutation({
      where: {
        id: event.id,
      },
      data,
    })
  })

  return (
    <div>
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
          <Select
            required
            data={EVENT_STATUS_DATA}
            label="Статус/видимость события"
            {...form.getInputProps("status")}
          />
        </Stack>

        <Button loading={isUpdating} type="submit">
          Обновить данные события
        </Button>
      </form>
    </div>
  )
}

export default EditEventForm
