import { BlitzPage } from "@blitzjs/auth"
import { Text, Stack, Box } from "@mantine/core"
import { GetServerSideProps } from "next"
import { Suspense } from "react"
import UserEnrollments from "src/profile/UserEnrollments"
import { getUserSSP } from "src/users/getSSP"
import Layout from "src/core/layouts/Layout"
import ProfileHeader from "src/profile/ProfileHeader"
import { ExtendedUser } from "src/users/types"
import UserTags from "src/profile/UserTags"

const ProfilePage: BlitzPage = ({ user }: { user: ExtendedUser }) => {
  return (
    <Layout>
      <ProfileHeader user={user} />
      <Stack spacing="xs">
        {user.company && (
          <Text size="lg">
            <strong>Компания:</strong> {user.company.name}
          </Text>
        )}

        <Text size="lg">
          <strong>Электронная почта:</strong> {user.email}
        </Text>
        <div>
          {user.enrollments.length > 0 && (
            <Box mb="sm">
              <Text size="lg" weight="bold">
                Скиллы пользователя:
              </Text>
              <Suspense>
                <UserTags user={user} />
              </Suspense>
            </Box>
          )}

          <Text size="lg" weight="bold">
            Курсы пользователя:
          </Text>
          <Suspense>
            <UserEnrollments user={user} />
          </Suspense>
        </div>
      </Stack>
    </Layout>
  )
}

export default ProfilePage

export const getServerSideProps: GetServerSideProps = getUserSSP
