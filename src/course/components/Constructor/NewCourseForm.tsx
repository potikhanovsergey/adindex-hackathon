import { useMutation } from "@blitzjs/rpc"
import { Button, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { FC } from "react"
import createCourse from "src/course/mutations/createCourse"
import {
  validateCourseName,
  validateCourseShortDescription,
  COURSE_NAME_MIN_LENGTH,
  COURSE_NAME_MAX_LENGTH,
  COURSE_SHORT_DESC_MIN_LENGTH,
  COURSE_SHORT_DESC_MAX_LENGTH,
} from "src/course/utils"

const NewCourseForm: FC = () => {
  const form = useForm({
    initialValues: {
      name: "",
      shortDescription: "",
    },

    validate: {
      name: validateCourseName,
      shortDescription: validateCourseShortDescription,
    },
  })

  const [createCourseMutation, { isLoading: isCreating }] = useMutation(createCourse)

  const handleSubmit = form.onSubmit(async (data) => {
    const response = await createCourseMutation({
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
      </Stack>

      <Button loading={isCreating} type="submit">
        Создать курс
      </Button>
    </form>
  )
}

export default NewCourseForm
