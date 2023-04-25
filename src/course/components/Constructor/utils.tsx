import {
  IconBrain,
  IconNotes,
  IconStarHalfFilled,
  IconVideo,
  TablerIconsProps,
} from "@tabler/icons-react"
import { CourseStepType } from "db"

export const STEP_TYPE_LABEL = {
  [CourseStepType.review]: "Отзыв",
  [CourseStepType.test]: "Тест",
  [CourseStepType.text]: "Текст",
  [CourseStepType.video]: "Видео",
}
export const getStepTypeIcon = ({
  size = "1rem",
  icon,
}: {
  size?: TablerIconsProps["size"]
  icon: keyof typeof CourseStepType
}) => {
  if (icon === CourseStepType.review) return <IconStarHalfFilled size={size} />
  else if (icon === CourseStepType.test) return <IconBrain size={size} />
  else if (icon === CourseStepType.text) return <IconNotes size={size} />
  else if (icon === CourseStepType.video) return <IconVideo size={size} />

  return null
}
