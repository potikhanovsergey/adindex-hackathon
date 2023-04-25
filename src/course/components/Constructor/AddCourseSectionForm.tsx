import { useMutation } from "@blitzjs/rpc"
import { TextInput, Button } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals } from "@mantine/modals"
import { useRouter } from "next/router"
import { FC } from "react"
import createCourseSection from "src/course/mutations/createCourseSection"
import { CoursePageProps } from "src/pages/courses/[id]"

const AddCourseSectionForm: FC<CoursePageProps> = ({ course }) => {
  const form = useForm({
    initialValues: {
      title: "",
    },

    validate: {
      title: (value) =>
        value.length >= 4 && value.length <= 32
          ? null
          : "Длина секции должна быть от 4 до 32 символов",
    },
  })

  const [createCourseSectionMutation, { isLoading: isCreating }] = useMutation(createCourseSection)

  const router = useRouter()

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const index =
        course.sections.length === 0 ? 10 : course.sections[course.sections.length - 1].index + 10

      await createCourseSectionMutation({
        data: { courseId: course.id, title: values.title, index },
      })
      closeAllModals()
      void router.replace(router.asPath)
    } catch (err) {}
  })

  return (
    <form onSubmit={handleSubmit}>
      <TextInput
        withAsterisk
        label="Название секции"
        description="От 4 до 32 символов"
        placeholder="Введите название секции"
        data-autofocus
        {...form.getInputProps("title")}
      />
      <Button loading={isCreating} type="submit" fullWidth mt="md">
        Добавить секцию
      </Button>
    </form>
  )
}

export default AddCourseSectionForm
