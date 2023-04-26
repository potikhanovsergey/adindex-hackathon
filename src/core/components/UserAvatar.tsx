import { Avatar, AvatarProps } from "@mantine/core"
import { supabase } from "lib/supabase"
import { FC, useEffect, useState } from "react"
import { UserProps } from "src/users/queries/getCurrentUser"

interface UserAvatarProps extends AvatarProps {
  user: Exclude<UserProps, null>
}

const UserAvatar: FC<UserAvatarProps> = ({ user, ...props }) => {
  const [src, setSrc] = useState<string | null>(null)

  useEffect(() => {
    if (user.avatarUrl) {
      const { data } = supabase.storage.from("images").getPublicUrl(user.avatarUrl)
      setSrc(data.publicUrl)
    }
  }, [user.avatarUrl])

  return (
    <Avatar src={src} {...props}>
      {user.firstName[0]} {user.lastName[0]}
    </Avatar>
  )
}

export default UserAvatar
