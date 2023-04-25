import { TextInput, NumberInput, Stack, Text, Group, Button } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals, closeModal } from "@mantine/modals"
import { FC } from "react"
import { COURSE_STEP_TYPE_EDIT_ID } from "./AddCourseStepButton"
import RichTextarea, { RichTextareaExtensions } from "src/core/components/RichTextarea"
import { useEditor } from "@tiptap/react"
import { useMutation } from "@blitzjs/rpc"
import { useSelector } from "@legendapp/state/react"
import createCourseStep from "src/course/mutations/createCourseStep"
import { courseStepType, sectionForEditableStep } from "./store"
import { useRouter } from "next/router"
import { Prisma } from "@prisma/client"
import updateCourseStep from "src/course/mutations/updateCourseStep"
import { ExtendedCourseStep } from "src/course/types"

interface CourseStepTypeEditProps {
  step?: ExtendedCourseStep
}

const CourseStepTypeEdit: FC<CourseStepTypeEditProps> = ({ step }) => {
  const courseStepTypeValue = useSelector(courseStepType)
  const parentSection = useSelector(sectionForEditableStep)

  const form = useForm({
    initialValues: {
      title: step?.title || "",
      duration: step?.duration || 30,
      videoURL: step?.contentVideo?.url || "",
    },
  })

  const editor = useEditor({
    extensions: RichTextareaExtensions,
    content: step?.contentText?.text || "",
  })

  const [createCourseStepMutation, { isLoading: isCreating }] = useMutation(createCourseStep)
  const [updateCourseMutation, { isLoading: isUpdating }] = useMutation(updateCourseStep)

  const router = useRouter()

  const handleSubmit = form.onSubmit(async (values) => {
    if (parentSection) {
      const index =
        parentSection.steps.length === 0
          ? 10
          : parentSection.steps[parentSection.steps.length - 1].index + 10

      const sharedData: Partial<Prisma.CourseStepCreateArgs>["data"] = {
        title: values.title,
        duration: values.duration,
        type: courseStepTypeValue,
        index: step ? step.index : index,
        sectionId: parentSection.id,
      }

      try {
        // Для типа Текст нужно взять HTML данные из Editor
        if (courseStepTypeValue === "text" && editor) {
          const textContent = editor.getHTML()

          if (!step) {
            await createCourseStepMutation({
              data: {
                ...sharedData,
                contentText: {
                  create: {
                    text: textContent,
                  },
                },
              },
            })
          } else {
            await updateCourseMutation({
              where: {
                id: step.id,
              },
              data: {
                ...sharedData,
                contentText: {
                  update: {
                    text: textContent,
                  },
                },
              },
            })
          }
        } else if (courseStepTypeValue === "video") {
          if (!step) {
            await createCourseStepMutation({
              data: {
                ...sharedData,
                contentVideo: {
                  create: {
                    url: values.videoURL,
                  },
                },
              },
            })
          } else {
            await updateCourseMutation({
              where: {
                id: step.id,
              },
              data: {
                ...sharedData,
                contentVideo: {
                  update: {
                    url: values.videoURL,
                  },
                },
              },
            })
          }
        }

        closeAllModals()
        void router.replace(router.asPath)
      } catch (error) {}
    }
  })

  const handleStepBack = () => closeModal(COURSE_STEP_TYPE_EDIT_ID)

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="xs">
        <TextInput
          required
          label="Название шага"
          description="От 4 до 64 символов"
          {...form.getInputProps("title")}
        />
        <NumberInput
          min={0}
          max={1000}
          required
          {...form.getInputProps("duration")}
          description="Укажите время в минутах для шага, чтобы мы рассчитали общее время курса"
          label="Длительность шага в минутах"
        />

        {
          {
            text: (
              <div>
                <Text mb="xs" size="xs" weight={500}>
                  Контент шага
                </Text>
                <RichTextarea editor={editor} />
              </div>
            ),
            video: (
              <TextInput
                required
                description="Убедитесь, что видео доступно для просмотра по ссылке"
                label="Вставьте ссылку на видео Youtube"
                {...form.getInputProps("videoURL")}
              />
            ),
          }[courseStepTypeValue]
        }
      </Stack>
      <Group position="right" mt="lg">
        {!step && (
          <Button variant="default" onClick={handleStepBack}>
            Назад
          </Button>
        )}
        <Button loading={isCreating || isUpdating} type="submit">
          {step ? "Редактировать" : "Создать"} шаг
        </Button>
      </Group>
    </form>
  )
}

export default CourseStepTypeEdit
