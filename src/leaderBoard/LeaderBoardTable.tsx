import { Routes } from "@blitzjs/next"
import { Box, Table, useMantineTheme } from "@mantine/core"
import { User } from "@prisma/client"
import { useRouter } from "next/router"

const LeaderBoardTable = ({ users }: { users: User[] }) => {
  const theme = useMantineTheme()
  const router = useRouter()

  const rows = users?.map((user, i) => (
    <Box
      component="tr"
      key={user.id}
      sx={{ cursor: "pointer", "&:hover": { background: theme.colors.gray[1] } }}
      onClick={() => router.push(Routes.ProfilePage({ id: user.id }))}
    >
      <td>{i + 1}</td>
      <td>{user.firstName}</td>
      <td>{user.lastName}</td>
      <td>{user.patronymic || "Не указано"}</td>
      <td>{user.email}</td>
      <td>{1000 - (i + 1) * 100}</td>
    </Box>
  ))

  return (
    <>
      <Table fontSize="xs">
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Отчество</th>
            <th>Email</th>
            <th>Сумма баллов</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  )
}

export default LeaderBoardTable
