import { Button, ButtonProps } from "@mantine/core"
import { modals } from "@mantine/modals"
import { FC } from "react"
import AddCourseSectionForm from "./AddCourseSectionForm"
import { CoursePageProps } from "src/pages/courses/[id]"

const AddCourseSectionButton: FC<CoursePageProps & ButtonProps> = ({ course, ...props }) => {
  const handleClick = () => {
    modals.open({
      title: "Добавить новую секцию",
      centered: true,
      children: <AddCourseSectionForm course={course} />,
    })
  }

  return (
    <Button onClick={handleClick} {...props}>
      Добавить секцию
    </Button>
  )
}

export default AddCourseSectionButton
