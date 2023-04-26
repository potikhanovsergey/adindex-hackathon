import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { useSelector } from "@legendapp/state/react"
import { Box, Button, Drawer, Group } from "@mantine/core"
import { FC, useCallback, useEffect, useState } from "react"
import { Edge, Node, ReactFlowInstance, addEdge, useEdgesState, useNodesState } from "reactflow"
import updateFlow from "src/flow/mutations/updateFlow"
import { drawerOpened } from "src/states/flow"
import getFlows from "src/flow/queries/getFlows"
import Flow from "../Flow/Flow"

export interface FlowEditorProps {
  nodes?: Node[]
  edges?: Edge[]
  flowId: number
}

const FlowEditor: FC<FlowEditorProps> = (props) => {
  // Drawer с настройками узла
  const drawerOpenedValue = useSelector(drawerOpened)
  const closeDrawer = () => drawerOpened.set(false)

  const [nodes, setNodes, onNodesChange] = useNodesState(props.nodes || [])
  const [edges, setEdges, onEdgesChange] = useEdgesState(props.edges || [])

  const onConnect = useCallback((params) => setEdges((els) => addEdge(params, els)), [])

  const [flowInstance, setFlowInstance] = useState<ReactFlowInstance | null>(null)
  const [updateFlowMutation, { isLoading: isSavingFlow }] = useMutation(updateFlow)

  const saveFlow = async () => {
    if (flowInstance) {
      const flow = flowInstance.toObject()

      // const response = await updateFlowMutation({
      //   where: {
      //     id: props.flowId,
      //   },
      //   data: {
      //     viewport: {
      //       create: flow.viewport,
      //     },
      //     edges: {
      //       deleteMany: {
      //         flowId: props.flowId,
      //       },
      //       create: flow.edges.map((edge) => ({
      //         source: edge.source,
      //         target: edge.target,
      //         connectionId: edge.id,
      //       })),
      //     },
      //     nodes: {
      //       deleteMany: {
      //         flowId: props.flowId,
      //       },
      //       create: flow.nodes.map((node) => ({
      //         nodeId: +node.id,
      //         x: node.position.x,
      //         y: node.position.y,
      //         title: node.data.title,
      //         subline: node.data.subline,
      //       })),
      //     },
      //   },
      //   include: {
      //     edges: true,
      //     nodes: true,
      //   },
      // })

      await invalidateQuery(getFlows)
    }
  }

  useEffect(() => {
    return () => {
      drawerOpened.set(false)
    }
  }, [])

  const addNode = () => {
    const newNode = {
      id: new Date().getTime() + "",
      type: "turbo",
      data: { title: "Title", subline: "Subline" },
      position: { x: 0, y: 50 },
    }

    setNodes((prev) => [...prev, newNode])
  }

  return (
    <>
      <Drawer position="right" opened={drawerOpenedValue} onClose={closeDrawer}>
        Контент
      </Drawer>

      <Group mb="sm">
        <Button onClick={addNode}>Добавить курс</Button>
        <Button loading={isSavingFlow} onClick={saveFlow}>
          Сохранить
        </Button>
      </Group>

      <Box h="50vh">
        <Flow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onInit={setFlowInstance}
        />
      </Box>
    </>
  )
}

export default FlowEditor
