import { BlitzPage } from "@blitzjs/next"
import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Stack, TextInput, Title } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { Company } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getCompanySSP } from "src/company/getSSP"
import updateCompany from "src/company/mutations/updateCompany"
import CompanyLayout from "src/core/layouts/CompanyLayout"
import getUsers from "src/users/queries/getUsers"
import { validateEmail } from "src/users/utils"

const CompanySettingsPage: BlitzPage = ({ company }: { company: Company }) => {
  const form = useForm({
    initialValues: {
      name: company.name || "",
      websiteUrl: company.websiteUrl || "",
      email: company.email || "",
      telegramId: company.telegramId || "",
      phoneNumber: company.phoneNumber || "",
    },

    validate: {
      email: validateEmail,
    },
  })

  const [updateCompanyMutation, { isLoading: isCompanyUpdating }] = useMutation(updateCompany)

  return (
    <CompanyLayout>
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const response = await updateCompanyMutation({
              where: { id: company.id },
              data: {
                email: values.email,
                websiteUrl: values.websiteUrl,
                name: values.name,
                telegramId: values.telegramId,
                phoneNumber: values.phoneNumber,
              },
            })

            notifications.show({
              withCloseButton: true,
              autoClose: 5000,
              message: "Данные компании успешно обновлены.",
              color: "green",
            })
            close()
          } catch (error) {
            notifications.show({
              withCloseButton: true,
              autoClose: 5000,
              title: "Что-то пошло не так при обновлении данных компании",
              message: error?.toString?.(),
              color: "red",
            })
          }
        })}
      >
        <Stack>
          <TextInput
            label="Название"
            placeholder="Outside..."
            {...form.getInputProps("name")}
            required
          />
          <TextInput
            label="Электронная почта"
            placeholder="outsi@mail.ru"
            {...form.getInputProps("email")}
          />
          <TextInput
            label="Ссылка на сайт"
            placeholder="https://..."
            {...form.getInputProps("websiteUrl")}
          />
          <TextInput
            label="Номер телефона"
            placeholder="8920..."
            {...form.getInputProps("phoneNumber")}
          />
          <TextInput
            label="Профиль в телеграме"
            placeholder="@outsi"
            {...form.getInputProps("telegramId")}
          />

          <Button type="submit" w="fit-content" mt="sm" loading={isCompanyUpdating}>
            Сохранить
          </Button>
        </Stack>
      </form>{" "}
    </CompanyLayout>
  )
}

export default CompanySettingsPage

export const getServerSideProps: GetServerSideProps = getCompanySSP
