import { Routes } from "@blitzjs/next"
import { Button, Group, Paper, SimpleGrid, Text } from "@mantine/core"
import { Flow } from "@prisma/client"
import Link from "next/link"
import { FC } from "react"

interface FlowsGridProps {
  flows: Flow[]
}

const FlowsGrid: FC<FlowsGridProps> = ({ flows }) => {
  return (
    <SimpleGrid cols={3}>
      {flows.map((flow) => (
        <Paper key={flow.id} p="md">
          <Text mb="sm">{flow.id}</Text>
          <Text>{flow.visible ? "Visible" : "Hidden"}</Text>
          <Group mt="md" position="right">
            <Button compact component={Link} href={Routes.FlowPage({ id: flow.id })}>
              В траекторию
            </Button>
          </Group>
        </Paper>
      ))}
    </SimpleGrid>
  )
}

export default FlowsGrid
