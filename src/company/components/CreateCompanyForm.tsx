import { useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import { Box, Overlay, Paper, Button, Stack, TextInput, Tooltip, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useEditor } from "@tiptap/react"
import Link from "next/link"
import { FC, useEffect } from "react"
import RichTextarea, { RichTextareaExtensions } from "src/core/components/RichTextarea"
import createCompany from "../mutations/createCompany"
import { CompanyStatus } from "@prisma/client"
import { notifications } from "@mantine/notifications"

const formInitialValues = {
  name: "",
  telegramId: "",
  phoneNumber: "",
  websiteUrl: "",
  email: "",
}

const CreateCompanyForm: FC = () => {
  const session = useSession()

  const form = useForm({
    initialValues: formInitialValues,
  })

  const editor = useEditor({
    extensions: RichTextareaExtensions,
    content: "",
  })

  const [createCompanyMutation, { isLoading: isCreating }] = useMutation(createCompany)

  const handleSubmit = form.onSubmit(async (values) => {
    if (session.userId) {
      try {
        await createCompanyMutation({
          data: {
            ...values,
            description: editor?.getHTML(),
            status: CompanyStatus.unverified,
          },
        })
        notifications.show({
          withCloseButton: true,
          autoClose: 5000,
          title: "Заявка на создание компании успешно отправлена!",
          message:
            "Модератор проверит Вашу заявку в ближайшее время. Следите за статусами заявки в своем профиле.",
          color: "green",
        })
        form.setValues(formInitialValues)
        editor?.commands.setContent("")
      } catch (error) {
        notifications.show({
          withCloseButton: true,
          autoClose: 5000,
          title: "Что-то пошло не так при создании заявки",
          message: error?.toString?.(),
          color: "red",
        })
      }
    }
  })
  return (
    <Box pos="relative">
      {!session.userId && (
        <Overlay center color="#000" opacity={0.1}>
          <Paper p="md">
            <Text mb="sm" weight="bold">
              Войдите в аккаунт, чтобы создать компанию
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
            <TextInput label="Название компании" {...form.getInputProps("name")} required />
            <TextInput
              label="Телеграм компании/представителя"
              {...form.getInputProps("telegramId")}
              required={form.values.phoneNumber.length === 0}
            />
            <TextInput
              label="Телефон компании/представителя"
              {...form.getInputProps("phoneNumber")}
            />
            <TextInput label="Почта компании/представителя" {...form.getInputProps("email")} />
            <TextInput label="Ссылка на сайт" {...form.getInputProps("websiteUrl")} />
            <div>
              <Text mb="xs" size="xs" weight={500}>
                Описание компании
              </Text>
              <RichTextarea editor={editor} />
            </div>{" "}
          </Stack>
          <Tooltip
            label="Войдите в аккаунт, чтобы создать компанию"
            disabled={Boolean(session.userId)}
          >
            <div>
              <Button
                loading={isCreating}
                disabled={!session.userId}
                fullWidth
                mt="xl"
                type="submit"
              >
                Отправить заявку
              </Button>
            </div>
          </Tooltip>
        </Paper>
      </form>
    </Box>
  )
}

export default CreateCompanyForm
