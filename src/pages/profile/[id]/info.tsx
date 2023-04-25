import { BlitzPage } from "@blitzjs/auth"
import { Avatar, Title, Group, Text, Stack, Badge } from "@mantine/core"
import { User } from "@prisma/client"
import { GetServerSideProps } from "next"
import { Suspense } from "react"
import ProfileLayout from "src/core/layouts/ProfileLayout"
import UserEnrollments from "src/profile/UserEnrollments"
import { getUserSSP } from "src/users/getSSP"
import { Role } from "db"

const ProfileInfoPage: BlitzPage = ({ user }: { user: User }) => {
  const fullName = user
    ? [user.firstName, user.lastName, user.patronymic].filter(Boolean).join(" ")
    : null

  return (
    <ProfileLayout>
      <Group mb="md">
        <Avatar size="xl">{user.firstName.substring(0, 1) + user.lastName.substring(0, 1)}</Avatar>
        <Stack spacing={0} align="flex-start">
          <Text size={36} weight="bold">
            {fullName}
          </Text>
          {(user.role === Role.ADMIN || user.role === Role.RECRUITER) && (
            <Badge color="lime">{user.role}</Badge>
          )}
        </Stack>
      </Group>
      <Stack>
        <Text size="lg">
          <strong>Электронная почта:</strong> {user.email}
        </Text>
        <div>
          <Text size="lg" weight="bold">
            Курсы пользователя:
          </Text>
          <Suspense>
            <UserEnrollments user={user} />
          </Suspense>
        </div>
      </Stack>
    </ProfileLayout>
  )
}

export default ProfileInfoPage

export const getServerSideProps: GetServerSideProps = getUserSSP
