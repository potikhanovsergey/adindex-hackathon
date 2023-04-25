import { useMutation } from "@blitzjs/rpc"
import { Button, Stack, TextInput, Textarea } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FC, useEffect } from "react"
import {
  COURSE_NAME_MIN_LENGTH,
  COURSE_NAME_MAX_LENGTH,
  COURSE_SHORT_DESC_MIN_LENGTH,
  COURSE_SHORT_DESC_MAX_LENGTH,
  validateCourseShortDescription,
  validateCourseName,
  COURSE_DESC_MAX_LENGTH,
  validateCourseDescription,
} from "../../utils"
import { CoursePageProps } from "src/pages/courses/[id]"
import updateCourse from "../../mutations/updateCourse"

const EditCourseForm: FC<CoursePageProps> = ({ course }) => {
  const form = useForm({
    initialValues: {
      name: course.name,
      shortDescription: course.shortDescription,
      description: course.description,
    },

    validate: {
      name: validateCourseName,
      shortDescription: validateCourseShortDescription,
      description: validateCourseDescription,
    },
  })

  useEffect(() => {
    form.setValues({
      name: course.name,
      shortDescription: course.shortDescription,
      description: course.description || "",
    })
  }, [course])

  const [updateCourseMutation, { isLoading: isUpdating }] = useMutation(updateCourse)

  const handleSubmit = form.onSubmit(async (data) => {
    const response = await updateCourseMutation({
      where: {
        id: course.id,
      },
      data,
    })
  })

  return (
    <form onSubmit={handleSubmit}>
      <Stack mb="md">
        <TextInput
          withAsterisk
          label="Название курса"
          description={`От ${COURSE_NAME_MIN_LENGTH} до ${COURSE_NAME_MAX_LENGTH} символов`}
          {...form.getInputProps("name")}
        />
        <TextInput
          withAsterisk
          label="Краткое описание курса"
          description={`От ${COURSE_SHORT_DESC_MIN_LENGTH} до ${COURSE_SHORT_DESC_MAX_LENGTH} символов`}
          {...form.getInputProps("shortDescription")}
        />
        <Textarea
          label="Подробное описание курса"
          autosize
          minRows={2}
          maxRows={8}
          description={`До ${COURSE_DESC_MAX_LENGTH} символов`}
          {...form.getInputProps("description")}
        />
      </Stack>

      <Button loading={isUpdating} type="submit">
        Обновить данные курса
      </Button>
    </form>
  )
}

export default EditCourseForm
