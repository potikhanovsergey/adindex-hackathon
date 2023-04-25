import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Box, Container, Drawer, Loader, Title, useMantineTheme } from "@mantine/core"
import Flow from "src/flow/components/Flow/Flow"

import { useSelector } from "@legendapp/state/react"
import { drawerOpened } from "src/states/flow"
import { Suspense, useMemo } from "react"
import { GetServerSideProps } from "next"
import { ExtendedFlow } from "src/flow/types"
import { getFlowSSP } from "src/flow/getSSP"

export interface FlowSSP {
  flow: ExtendedFlow
}

const FlowPage: BlitzPage<FlowSSP> = ({ flow }) => {
  const theme = useMantineTheme()

  const drawerOpenedValue = useSelector(drawerOpened)

  const props = useMemo(() => {
    if (!flow)
      return {
        edges: [],
        nodes: [],
      }
    return {
      edges: flow.edges.map((edge) => ({
        id: edge.connectionId,
        source: edge.source,
        target: edge.target,
      })),
      nodes: flow.nodes.map((node) => ({
        id: node.nodeId + "",
        data: { subline: node.course.shortDescription, title: node.course.name },
        position: { x: node.x, y: node.y },
        type: "turbo",
        // Узлам нужно указать ненулевое значение в width и height, чтобы их было видно
        width: 1,
        height: 1,
      })),
    }
  }, [flow])

  return (
    <Layout>
      <Container mt={100}>
        <Title mb="xl">Траектория {flow.id.toString()}</Title>

        <Box h="80vh" w="100%">
          <Box
            w="100%"
            h="75%"
            sx={{
              border: "1px solid",
              borderColor: theme.colors.dark[3],
              borderRadius: theme.radius.md,
            }}
          >
            <Suspense fallback={<Loader />}>
              <Flow {...props} />
            </Suspense>
          </Box>
        </Box>
        <Drawer position="right" opened={drawerOpenedValue} onClose={() => drawerOpened.set(false)}>
          Контент
        </Drawer>
      </Container>
    </Layout>
  )
}

export default FlowPage

export const getServerSideProps: GetServerSideProps = getFlowSSP
