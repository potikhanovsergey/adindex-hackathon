import { useMutation } from "@blitzjs/rpc"
import { FileButton, Button, ButtonProps } from "@mantine/core"
import { notifications } from "@mantine/notifications"
import { supabase } from "lib/supabase"
import { useRouter } from "next/router"
import { FC, useState, useEffect } from "react"
import updateEvent from "src/event/mutations/updateEvent"
import { ExtendedEvent } from "src/event/types"

interface UploadNewPhotoProps extends ButtonProps {
  event: ExtendedEvent
}

const UploadNewPhoto: FC<UploadNewPhotoProps> = ({ event, ...props }) => {
  const [file, setFile] = useState<File | null>(null)
  const [updateEventMutation] = useMutation(updateEvent)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const uploadFile = async (file: File) => {
    setIsLoading(true)
    const { data } = await supabase.storage
      .from("images")
      .upload(`events/${event.id}-${new Date().getTime()}.png`, file, {
        cacheControl: "3600",
        upsert: true,
      })

    if (data?.path) {
      await updateEventMutation({
        where: { id: event.id },
        data: {
          previewImageUrl: data.path,
        },
      })
      event.previewImageUrl &&
        (await supabase.storage.from("images").remove([event.previewImageUrl]))
      void router.replace(router.asPath)
      notifications.show({
        withCloseButton: true,
        autoClose: 5000,
        title: "Новый аватар успешно загружен!",
        message: "Он будет виден на карточке и странице события",
        color: "green",
      })
    }
    setIsLoading(false)
    setFile(null)
  }

  useEffect(() => {
    if (file) {
      void uploadFile(file)
    }
  }, [file])

  return (
    <FileButton {...props} onChange={setFile} accept="image/png,image/jpeg">
      {(props) => (
        <Button loading={isLoading} {...props}>
          Обновить превью события
        </Button>
      )}
    </FileButton>
  )
}

export default UploadNewPhoto
