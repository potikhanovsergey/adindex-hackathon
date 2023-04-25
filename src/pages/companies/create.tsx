import { BlitzPage } from "@blitzjs/next"
import { Container, Title, Paper, TextInput, Button, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import Layout from "src/core/layouts/Layout"

const CreateCompanyPage: BlitzPage = () => {
  const form = useForm({
    initialValues: {
      name: "",
      telegramId: "",
      phoneNumber: "",
      websiteUrl: "",
      email: "",
    },
  })

  const handleSubmit = form.onSubmit((values) => {})
  return (
    <Layout>
      <Container size={420} mt={40}>
        <Title align="center">Создание компании</Title>

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
            </Stack>
            <Button fullWidth mt="xl" type="submit">
              Отправить заявку
            </Button>
          </Paper>
        </form>
      </Container>
    </Layout>
  )
}

export default CreateCompanyPage
