import { UnstyledButton, Paper, Group, Text, Box, useMantineTheme } from "@mantine/core"
import { CourseStepType } from "@prisma/client"
import { FC, ReactNode } from "react"
import { STEP_TYPE_LABEL } from "./utils"

export interface CourseStepTypeCardProps {
  description: string
  icon: ReactNode
  onClick?: () => void
  isActive: boolean
  slug: keyof typeof CourseStepType
}

const CourseStepTypeCard: FC<CourseStepTypeCardProps> = ({
  description,
  icon,
  slug,
  isActive,
  onClick,
}) => {
  const theme = useMantineTheme()

  return (
    <UnstyledButton onClick={onClick}>
      <Paper
        sx={
          isActive
            ? {
                background: theme.colors.yellow[0],
                borderColor: theme.colors.yellow[3] + "!important",
              }
            : undefined
        }
        p="md"
        h="100%"
      >
        <Group noWrap align="flex-start">
          <Box mt={4} sx={{ flexShrink: 0 }}>
            {icon}
          </Box>
          <div>
            <Text weight="bold">{STEP_TYPE_LABEL[slug]}</Text>
            <Text color="dimmed">{description}</Text>
          </div>
        </Group>
      </Paper>
    </UnstyledButton>
  )
}

export default CourseStepTypeCard
