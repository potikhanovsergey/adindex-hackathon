import { invalidateQuery, useMutation } from "@blitzjs/rpc"
import { Button, ButtonProps, FileButton } from "@mantine/core"
import { User } from "@prisma/client"
import { supabase } from "lib/supabase"
import { FC, useCallback, useEffect, useState } from "react"
import updateUser from "../mutations/updateUser"
import getCurrentUser from "../queries/getCurrentUser"
import { notifications } from "@mantine/notifications"

interface UploadNewPhotoProps extends ButtonProps {
  user: User
}

const UploadNewPhoto: FC<UploadNewPhotoProps> = ({ user, ...props }) => {
  const [file, setFile] = useState<File | null>(null)
  const [updateUserMutation] = useMutation(updateUser)
  const [isLoading, setIsLoading] = useState(false)

  const uploadFile = useCallback(
    async (file: File) => {
      setIsLoading(true)
      const { data } = await supabase.storage
        .from("images")
        .upload(`avatars/${user.id}-${new Date().getTime()}.png`, file, {
          cacheControl: "3600",
          upsert: true,
        })

      if (data?.path) {
        await updateUserMutation({
          where: { id: user.id },
          data: {
            avatarUrl: data.path,
          },
        })
        user.avatarUrl && (await supabase.storage.from("images").remove([user.avatarUrl]))
        await invalidateQuery(getCurrentUser)
        notifications.show({
          withCloseButton: true,
          autoClose: 5000,
          title: "Новый аватар успешно загружен!",
          message: "Он будет виден в публичном профиле, событиях, курсах и заявках вакансий.",
          color: "green",
        })
      }
      setIsLoading(false)
      setFile(null)
    },
    [user.avatarUrl]
  )

  useEffect(() => {
    if (file) {
      void uploadFile(file)
    }
  }, [file])

  return (
    <FileButton {...props} onChange={setFile} accept="image/png,image/jpeg">
      {(props) => (
        <Button loading={isLoading} {...props}>
          Обновить фотографию профиля
        </Button>
      )}
    </FileButton>
  )
}

export default UploadNewPhoto
