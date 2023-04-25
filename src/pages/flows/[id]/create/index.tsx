import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Container, useMantineTheme, Title, Button, Group } from "@mantine/core"

import FlowEditor from "src/flow/components/FlowEditor"
import { GetServerSideProps } from "next"
import { getFlowSSP } from "src/flow/getSSP"
import { FlowSSP } from ".."
import { useMemo, useState } from "react"
import { useMutation } from "@blitzjs/rpc"
import { IconEyeOff, IconEye } from "@tabler/icons-react"
import updateFlow from "src/flow/mutations/updateFlow"

const CreateFlowPage: BlitzPage<FlowSSP> = (props) => {
  const [flow, setFlow] = useState(props.flow)

  const flowEditorProps = useMemo(() => {
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

  const [updateFlowMutation, { isLoading: isFlowUpdating }] = useMutation(updateFlow)

  const updateFlowVisibility = async (visible: boolean) => {
    const response = await updateFlowMutation({
      where: {
        id: flow.id,
      },
      data: {
        visible,
      },
    })
    setFlow((prev) => ({ ...prev, visible: response.visible }))
  }

  const hideFlow = () => updateFlowVisibility(false)
  const showFlow = () => updateFlowVisibility(true)
  return (
    <Layout>
      <Container>
        <Group position="apart">
          <Title mb="xl">Траектория {flow.id}</Title>

          <Button
            variant="light"
            color="gray"
            leftIcon={flow.visible ? <IconEyeOff size={20} /> : <IconEye size={20} />}
            compact
            onClick={flow.visible ? hideFlow : showFlow}
            loading={isFlowUpdating}
          >
            {flow.visible ? "Скрыть для пользователей" : "Показать всем пользователям"}
          </Button>
        </Group>
        <FlowEditor flowId={flow.id} {...flowEditorProps} />
      </Container>
    </Layout>
  )
}

export default CreateFlowPage

export const getServerSideProps: GetServerSideProps = getFlowSSP
