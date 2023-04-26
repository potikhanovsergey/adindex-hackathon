import { Routes } from "@blitzjs/next"
import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, Stack, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { notifications } from "@mantine/notifications"
import { useRouter } from "next/router"
import { FC } from "react"
import createCourse from "src/course/mutations/createCourse"
import getCourses from "src/course/queries/getCourses"
import {
  validateCourseName,
  validateCourseShortDescription,
  COURSE_NAME_MIN_LENGTH,
  COURSE_NAME_MAX_LENGTH,
  COURSE_SHORT_DESC_MIN_LENGTH,
  COURSE_SHORT_DESC_MAX_LENGTH,
} from "src/course/utils"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"

const initialValues = {
  name: "",
  shortDescription: "",
}

const NewCourseForm: FC = () => {
  const form = useForm({
    initialValues,

    validate: {
      name: validateCourseName,
      shortDescription: validateCourseShortDescription,
    },
  })

  const user = useCurrentUser()

  const [createCourseMutation, { isLoading: isCreating }] = useMutation(createCourse)
  const router = useRouter()

  const handleSubmit = form.onSubmit(async (data) => {
    if (user?.company) {
      try {
        const response = await createCourseMutation({
          data: {
            ...data,
            companyId: user.company.id,
          },
        })
        await invalidateQuery(getCourses)
        form.setValues(initialValues)
        void router.push(Routes.EditCoursePage({ id: response.id }))
      } catch (error) {
        notifications.show({
          withCloseButton: true,
          autoClose: false,
          title: "Что-то пошло не так при создании курса",
          message: error?.toString?.(),
          color: "red",
        })
      }
    }
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
