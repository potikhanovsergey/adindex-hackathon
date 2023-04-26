import { Group, Avatar, Stack, Badge, Text } from "@mantine/core"
import { Role, User } from "@prisma/client"

const ProfileHeader = ({ user }: { user: User }) => {
  const fullName = user
    ? [user.lastName, user.firstName, user.patronymic].filter(Boolean).join(" ")
    : null

  return (
    <Group mb="md" align="flex-start">
      <Avatar size="xl">{user.firstName.substring(0, 1) + user.lastName.substring(0, 1)}</Avatar>
      <Stack spacing={0} align="flex-start">
        <Text size={32} weight="bold">
          {fullName}
        </Text>
        {(user.role === Role.ADMIN || user.role === Role.RECRUITER) && (
          <Badge color="lime">{user.role}</Badge>
        )}
      </Stack>
    </Group>
  )
}

export default ProfileHeader
