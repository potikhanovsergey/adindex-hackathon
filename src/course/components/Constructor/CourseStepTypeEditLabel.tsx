import { useSelector } from "@legendapp/state/react"
import { FC } from "react"
import { courseStepType } from "./store"
import { STEP_TYPE_LABEL } from "./utils"
import { Text } from "@mantine/core"

const CourseStepTypeEditLabel: FC = () => {
  const courseStepTypeValue = useSelector(courseStepType)

  return (
    <Text>
      Настройка шага{" "}
      <Text color="green" span inherit>
        &quot;{STEP_TYPE_LABEL[courseStepTypeValue]}&quot;
      </Text>
    </Text>
  )
}

export default CourseStepTypeEditLabel
