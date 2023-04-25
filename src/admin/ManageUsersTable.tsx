import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Box, Drawer, Table, useMantineTheme, Text, Select, Button, Stack } from "@mantine/core"
import { useForm } from "@mantine/form"
import { useDisclosure } from "@mantine/hooks"
import { Role, User } from "@prisma/client"
import { useEffect, useState } from "react"
import updateUser from "src/users/mutations/updateUser"
import getUsers from "src/users/queries/getUsers"

const ManageUsersTable = ({ users }: { users: User[] }) => {
  const theme = useMantineTheme()

  const [drawerOpened, { open, close }] = useDisclosure(false)

  const [chosenUser, setChosenUser] = useState<User | null>(null)

  const [updateUserMutation] = useMutation(updateUser)

  const rows = users?.map((user) => (
    <Box
      component="tr"
      key={user.id}
      onClick={() => {
        setChosenUser(user)
        open()
      }}
      sx={{ cursor: "pointer", "&:hover": { background: theme.colors.gray[1] } }}
    >
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.patronymic || "Не указано"}</td>
      <td>{user.email}</td>
      <td>{user.role}</td>
    </Box>
  ))

  const form = useForm({
    initialValues: {
      role: "",
    },
  })

  useEffect(() => {
    if (chosenUser) {
      form.setFieldValue("role", chosenUser.role)
    }
  }, [chosenUser])

  return (
    <>
      <Table fontSize="xs">
        <thead>
          <tr>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Email</th>
            <th>Роль в системе</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>

      <Drawer
        opened={drawerOpened}
        onClose={close}
        position="right"
        title="Редактировать пользователя"
      >
        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              const response = await updateUserMutation({
                where: { id: chosenUser?.id },
                data: {
                  role: values.role as Role,
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
            <Select
              label="Роль пользователя"
              data={[Role.USER, Role.RECRUITER, Role.ADMIN]}
              {...form.getInputProps("role")}
            />
            <Button type="submit">Сохранить изменения</Button>
          </Stack>
        </form>
      </Drawer>
    </>
  )
}

export default ManageUsersTable
