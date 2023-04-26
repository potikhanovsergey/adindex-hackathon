import { useSession } from "@blitzjs/auth"
import { useMutation } from "@blitzjs/rpc"
import { Button, Text } from "@mantine/core"
import { closeAllModals, modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import { useEditor } from "@tiptap/react"
import { FC } from "react"
import RichTextarea, { RichTextareaExtensions } from "src/core/components/RichTextarea"
import createRequest from "src/requests/mutations/createRequest"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import { ExtendedVacancy } from "./VacancyCard"

const CVForm: FC<{ vacancyId: number }> = ({ vacancyId }) => {
  const editor = useEditor({
    content: "",
    extensions: RichTextareaExtensions,
  })

  const session = useSession()

  const [createUserRequestMutation, { isLoading: isUserRequestLoading }] =
    useMutation(createRequest)

  const handleSubmit = async () => {
    try {
      if (session.userId) {
        const cv = editor?.getHTML()
        const response = await createUserRequestMutation({
          data: {
            userId: session.userId,
            vacancyId,
            cv,
          },
        })

        closeAllModals()

        notifications.show({
          withCloseButton: true,
          autoClose: 5000,
          message: "Заявка успешно отправлена",
          color: "green",
        })
      }
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
  return (
    <>
      <Text size="sm" mb={4}>
        Сопроводительное письмо
      </Text>
      <RichTextarea editor={editor} />
      <Button loading={isUserRequestLoading} onClick={handleSubmit} fullWidth type="submit" mt="md">
        Отправить
      </Button>
    </>
  )
}

const CreateRequestButton = ({ vacancy }: { vacancy: ExtendedVacancy }) => {
  const openCreateRequestModal = () => {
    modals.open({
      size: "50%",
      title: "Отправить заявку на вакансию",
      children: <CVForm vacancyId={vacancy.id} />,
    })
  }

  const user = useCurrentUser()

  return (
    <Button
      onClick={openCreateRequestModal}
      disabled={user?.requests.some((request) => request.vacancyId === vacancy.id)}
    >
      Откликнуться
    </Button>
  )
}

export default CreateRequestButton
