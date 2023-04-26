import { useMutation } from "@blitzjs/rpc"
import {
  Box,
  Paper,
  Button,
  Stack,
  TextInput,
  Text,
  NumberInput,
  Overlay,
  Tooltip,
} from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEditor } from "@tiptap/react"
import { FC } from "react"
import RichTextarea, { RichTextareaExtensions } from "src/core/components/RichTextarea"
import { VacancyStatus } from "@prisma/client"
import { notifications } from "@mantine/notifications"
import createVacancy from "../mutations/createVacancy"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { Routes } from "@blitzjs/next"
import Link from "next/link"

const formInitialValues = {
  title: "",
  salary: "",
}

const CreateVacancyForm: FC = () => {
  const user = useCurrentUser()

  const form = useForm({
    initialValues: formInitialValues,
  })

  const editor = useEditor({
    extensions: RichTextareaExtensions,
    content: "",
  })

  const [createVacancyMutation, { isLoading: isCreating }] = useMutation(createVacancy)

  const handleSubmit = form.onSubmit(async (values) => {
    if (user?.company) {
      try {
        await createVacancyMutation({
          data: {
            ...values,
            salary: +values.salary,
            description: editor?.getHTML() || "",
            status: VacancyStatus.OPENED,
            companyId: user.company.id,
          },
        })
        notifications.show({
          withCloseButton: true,
          autoClose: 5000,
          message: "Вакансия успешно создана",
          color: "green",
        })
        form.setValues(formInitialValues)
        editor?.commands.setContent("")
      } catch (error) {
        notifications.show({
          withCloseButton: true,
          autoClose: 5000,
          title: "Что-то пошло не так при создании вакансии",
          message: error?.toString?.(),
          color: "red",
        })
      }
    }
  })
  return (
    <Box pos="relative">
      {!user && (
        <Overlay center color="#000" opacity={0.1}>
          <Paper p="md">
            <Text mb="sm" weight="bold">
              Вы должны быть рекрутером, чтобы создать компанию
            </Text>
            <Button fullWidth component={Link} href={Routes.LoginPage()}>
              Войти в аккаунт
            </Button>
          </Paper>
        </Overlay>
      )}

      <form onSubmit={handleSubmit}>
        <Paper p={30} mt={30}>
          <Stack spacing="xs">
            <TextInput label="Название вакансии" {...form.getInputProps("title")} required />
            <NumberInput label="Зарплата" {...form.getInputProps("salary")} />
            <div>
              <Text mb="xs" size="xs" weight={500}>
                Описание вакансии
              </Text>
              <RichTextarea editor={editor} />
            </div>
          </Stack>

          <Tooltip
            label="Войдите в аккаунт рекрутера компании, чтобы создать вакансию"
            disabled={Boolean(user?.company)}
          >
            <div>
              <Button loading={isCreating} disabled={!user} fullWidth mt="xl" type="submit">
                Создать вакансию
              </Button>
            </div>
          </Tooltip>
        </Paper>
      </form>
    </Box>
  )
}

export default CreateVacancyForm
