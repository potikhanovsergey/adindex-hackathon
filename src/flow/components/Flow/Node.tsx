import React, { FC, memo, ReactNode } from "react"
import { Handle as FlowHandle, HandleProps, NodeProps, Position } from "reactflow"
import { IconSettings } from "@tabler/icons-react"
import { ActionIcon, Box, useMantineTheme } from "@mantine/core"
import { drawerOpened } from "src/states/flow"

export type TurboNodeData = {
  title: string
  subline?: string | null
}

const Handle: FC<HandleProps> = (props) => {
  const theme = useMantineTheme()
  return (
    <Box
      sx={{ border: "1px solid", borderRadius: 16, borderColor: theme.colors.gray[5] }}
      component={FlowHandle}
      w={16}
      h={16}
      {...props}
    />
  )
}

const Node: FC<NodeProps<TurboNodeData>> = memo(({ data }) => {
  return (
    <>
      <div className="settings gradient">
        <ActionIcon onClick={drawerOpened.toggle}>
          <IconSettings size={20} />
        </ActionIcon>
      </div>
      <Box w="100%" h="100%">
        <Box className="wrapper gradient" h="100%">
          <div className="inner">
            <div className="body">
              {/* {data.icon && <div className="icon">{data.icon}</div>} */}
              <div>
                <div className="title">{data.title}</div>
                {data.subline && <div className="subline">{data.subline}</div>}
              </div>
            </div>
          </div>
        </Box>
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Right} />
      </Box>
    </>
  )
})

export default Node
