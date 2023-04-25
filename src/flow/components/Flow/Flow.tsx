import React, { FC } from "react"
import ReactFlow, { Controls, Background, BackgroundVariant, ReactFlowProps } from "reactflow"

import "reactflow/dist/base.css"

import Node from "./Node"
import Edge from "./Edge"
import { useMantineTheme } from "@mantine/core"

const nodeTypes = {
  turbo: Node,
}

const edgeTypes = {
  turbo: Edge,
}

const defaultEdgeOptions = {
  type: "turbo",
  markerEnd: "edge-circle",
}

const proOptions = { hideAttribution: true }

const Flow: FC<ReactFlowProps> = (props) => {
  const theme = useMantineTheme()

  return (
    <ReactFlow
      fitView
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      style={{ borderRadius: theme.radius.md }}
      proOptions={proOptions}
      defaultViewport={{
        zoom: 0.5,
        x: 0,
        y: 0,
      }}
      {...props}
    >
      <Controls showInteractive={false} />
      <svg>
        <defs>
          <linearGradient id="edge-gradient">
            <stop offset="0%" stopColor="#ae53ba" />
            <stop offset="100%" stopColor="#2a8af6" />
          </linearGradient>

          <marker
            id="edge-circle"
            viewBox="-5 -5 10 10"
            refX="0"
            refY="0"
            markerUnits="strokeWidth"
            markerWidth="10"
            markerHeight="10"
            orient="auto"
          >
            <circle stroke="#2a8af6" strokeOpacity="0.75" r="2" cx="0" cy="0" />
          </marker>
        </defs>
      </svg>

      <Background variant={BackgroundVariant.Dots} color={theme.colors.dark[2]} />
    </ReactFlow>
  )
}

export default Flow
