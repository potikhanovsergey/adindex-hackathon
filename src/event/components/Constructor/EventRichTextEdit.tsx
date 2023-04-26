import { useMutation } from "@blitzjs/rpc"
import { Box, Button, Title } from "@mantine/core"
import { useEditor } from "@tiptap/react"
import { useRouter } from "next/router"
import { FC } from "react"
import RichTextarea, { RichTextareaExtensions } from "src/core/components/RichTextarea"
import updateEvent from "src/event/mutations/updateEvent"

interface EventRichTextEditProps {
  label: string
  content: string | null
  eventId: number
  slug: "about" | "rules" | "contacts"
}

const EventRichTextEdit: FC<EventRichTextEditProps> = ({ label, content, slug, eventId }) => {
  const editor = useEditor({ extensions: RichTextareaExtensions, content: content || "" })

  const [updateEventMutation, { isLoading }] = useMutation(updateEvent)
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const content = editor?.getHTML()
      if (content) {
        await updateEventMutation({
          where: {
            id: eventId,
          },
          data: {
            [slug]: content,
          },
        })
      } else {
        throw new Error("Editor is undefined")
      }
    } catch (error) {}
  }

  return (
    <Box>
      <Title order={1} mb="md" size="h3">
        Редактирование секции {label}
      </Title>
      <RichTextarea editor={editor} />
      <Button loading={isLoading} mt="md" onClick={handleSubmit}>
        Обновить секцию
      </Button>
    </Box>
  )
}

export default EventRichTextEdit
