import { useMutation, invalidateQuery } from "@blitzjs/rpc"
import { Button, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { User } from "@prisma/client"
import { GetServerSideProps } from "next"
import ProfileLayout from "src/core/layouts/ProfileLayout"
import UploadNewPhoto from "src/users/components/UploadNewPhoto"
import { getUserSSP } from "src/users/getSSP"
import updateUser from "src/users/mutations/updateUser"
import getUsers from "src/users/queries/getUsers"
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePatronymic,
} from "src/users/utils"

const ProfileSettings = ({ user }: { user: User }) => {
  const form = useForm({
    initialValues: {
      email: user.email || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      patronymic: user.patronymic || "",
    },

    validate: {
      email: validateEmail,
      firstName: validateFirstName,
      lastName: validateLastName,
      patronymic: validatePatronymic,
    },
  })

  const [updateUserMutation, { isLoading: isUserUpdating }] = useMutation(updateUser)

  return (
    <ProfileLayout>
      <UploadNewPhoto user={user} my="md" />
      <form
        onSubmit={form.onSubmit(async (values) => {
          try {
            const response = await updateUserMutation({
              where: { id: user.id },
              data: {
                email: values.email,
                firstName: values.firstName,
                lastName: values.lastName,
                patronymic: values.patronymic,
              },
            })

            void invalidateQuery(getUsers)
            close()
          } catch (e) {
            console.log(e)
          }
        })}
      >
        <Stack>
          <TextInput
            label="Имя"
            placeholder="Иван..."
            {...form.getInputProps("firstName")}
            required
          />
          <TextInput
            label="Фамилия"
            placeholder="Иванов..."
            {...form.getInputProps("lastName")}
            required
          />
          <TextInput
            label="Отчество"
            placeholder="Иванович..."
            {...form.getInputProps("patronymic")}
          />
          <TextInput
            label="Электронная почта"
            placeholder="ivan@mail.ru"
            {...form.getInputProps("email")}
            required
          />
          <Button type="submit" w="fit-content" mt="sm" loading={isUserUpdating}>
            Сохранить
          </Button>
        </Stack>
      </form>
    </ProfileLayout>
  )
}

export default ProfileSettings

export const getServerSideProps: GetServerSideProps = getUserSSP
