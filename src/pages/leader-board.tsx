import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Group, Loader, Title, Text, MultiSelect, TextInput } from "@mantine/core"
import { Suspense } from "react"
import { useQuery } from "@blitzjs/rpc"
import getUsers from "src/users/queries/getUsers"
import { useSession } from "@blitzjs/auth"
import LeaderBoardTable from "src/leaderBoard/LeaderBoardTable"
import { IconSearch } from "@tabler/icons-react"

const Users = () => {
  const [users] = useQuery(getUsers, {})

  return <LeaderBoardTable users={users!} />
}

const LeaderBoard: BlitzPage = () => {
  return (
    <Layout>
      <Title size={24} mb="md">
        Лидер борд
      </Title>
      <Group mb="md">
        <MultiSelect
          size="xs"
          label="Теги"
          data={[
            {
              value: "1",
              label: "Реклама",
            },
            {
              value: "1",
              label: "Figma",
            },
            {
              value: "1",
              label: "Маркетинг",
            },
            {
              value: "1",
              label: "Разработка",
            },
            {
              value: "1",
              label: "Дизайн",
            },
          ]}
        />
        <TextInput
          size="xs"
          label="Поиск по названию"
          icon={<IconSearch size={16} stroke={1.5} />}
        />
      </Group>
      <Suspense fallback={<Loader />}>
        <Users />
      </Suspense>
    </Layout>
  )
}

export default LeaderBoard
