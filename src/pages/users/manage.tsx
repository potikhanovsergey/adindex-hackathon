import { BlitzPage, useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Container, Loader, Title } from "@mantine/core"
import { useRouter } from "next/router"
import { Suspense, useEffect } from "react"
import ManageUsersTable from "src/admin/ManageUsersTable"
import Layout from "src/core/layouts/Layout"
import getUsers from "src/users/queries/getUsers"

const ManageUsers = () => {
  const session = useSession()
  const router = useRouter()

  const [users] = useQuery(getUsers, {
    where: {
      id: {
        not: session.userId || undefined,
      },
    },
  })

  useEffect(() => {
    if (session.role !== "ADMIN") {
      void router.push(Routes.EventsPage().href)
    }
  }, [session])

  if (session.role !== "ADMIN") return <></>

  return (
    <Layout>
      <Container>
        <Title mb="xl">Пользователи системы</Title>
        {users && users?.length > 0 && <ManageUsersTable users={users} />}
      </Container>
    </Layout>
  )
}

const ManageUsersPage: BlitzPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <ManageUsers />
    </Suspense>
  )
}

export default ManageUsersPage
