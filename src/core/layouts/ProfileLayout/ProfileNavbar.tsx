import { FC } from "react"
import { Navbar, Tabs } from "@mantine/core"
import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"

const ProfileNavbar: FC = () => {
  const param = useParam("id")

  const router = useRouter()
  const currPage = router.asPath.split("/")[3]

  return (
    <Navbar width={{ base: 256 }}>
      <Tabs
        w="100%"
        value={currPage}
        onTabChange={(value) => router.push(`/profile/${param}/${value}`)}
        orientation="vertical"
      >
        <Tabs.List w="100%">
          <Tabs.Tab value="info">Публичный профиль</Tabs.Tab>
          <Tabs.Tab value="settings">Редактирование профиля</Tabs.Tab>
        </Tabs.List>
      </Tabs>
    </Navbar>
  )
}

export default ProfileNavbar
