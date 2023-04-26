import { BlitzPage } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { Button, Container, Group, Loader } from "@mantine/core"
import Link from "next/link"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import FlowsGrid from "src/flow/components/FlowsGrid"
import getFlows from "src/flow/queries/getFlows"

const FlowsFetcher = () => {
  const [flows] = useQuery(getFlows, {})

  return <FlowsGrid flows={flows} />
}

const FlowsPage: BlitzPage = () => {
  return (
    <Layout>
      <Container>
        <Group position="right">
          <Button>Новая траектория</Button>
        </Group>
        <Suspense fallback={<Loader />}>
          <FlowsFetcher />
        </Suspense>
      </Container>
    </Layout>
  )
}

export default FlowsPage
