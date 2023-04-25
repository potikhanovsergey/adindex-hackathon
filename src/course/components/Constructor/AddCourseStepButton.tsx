import { Button, ButtonProps } from "@mantine/core"
import { modals } from "@mantine/modals"
import { FC } from "react"
import CourseStepTypePicker from "./CourseStepTypePicker"
import CourseStepTypeEdit from "./CourseStepTypeEdit"
import CourseStepTypeEditLabel from "./CourseStepTypeEditLabel"
import { sectionForEditableStep } from "./store"
import { CourseSection } from "@prisma/client"
import { ExtendedSection } from "src/course/types"

export const COURSE_STEP_MODAL_SIZE = "75%"

export const COURSE_STEP_TYPE_EDIT_ID = "course-step-type-edit"

const AddCourseStepButton: FC<ButtonProps & { section: ExtendedSection }> = ({
  section,
  ...props
}) => {
  const handleClick = () => {
    sectionForEditableStep.set(section)

    modals.openConfirmModal({
      size: COURSE_STEP_MODAL_SIZE,
      title: "Выберите вариант для шага",
      children: <CourseStepTypePicker />,
      closeOnConfirm: false,
      labels: { confirm: "Далее", cancel: "Отмена" },
      onConfirm: () =>
        modals.open({
          modalId: COURSE_STEP_TYPE_EDIT_ID,
          size: COURSE_STEP_MODAL_SIZE,
          title: <CourseStepTypeEditLabel />,
          children: <CourseStepTypeEdit />,
        }),
    })
  }

  return (
    <Button onClick={handleClick} {...props}>
      Добавить шаг
    </Button>
  )
}

export default AddCourseStepButton
