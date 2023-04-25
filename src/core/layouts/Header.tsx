import { Routes } from "@blitzjs/next"
import { useMutation } from "@blitzjs/rpc"
import {
  Container,
  Header as MantineHeader,
  Text,
  Group,
  Button,
  Avatar,
  Menu,
  Stack,
} from "@mantine/core"
import Link from "next/link"
import logout from "src/auth/mutations/logout"
import { Suspense } from "react"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import Navigation from "./Navigation"

const HeaderProfile = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const fullName = user
    ? [user.firstName, user.lastName, user.patronymic].filter(Boolean).join(" ")
    : null

  return user ? (
    <Menu>
      <Menu.Target>
        <Avatar alt="Avatar" sx={{ cursor: "pointer" }} />
      </Menu.Target>

      <Menu.Dropdown>
        <Stack spacing={0} px="sm">
          <Text size="sm">{fullName}</Text>
          <Text size="sm" color="dimmed">
            {user.email}
          </Text>
        </Stack>
        <Menu.Divider />

        {user.role === "ADMIN" && (
          <>
            <Menu.Item component={Link} href={Routes.ManageUsersPage()}>
              Управление пользователями
            </Menu.Item>
            <Menu.Divider />
          </>
        )}

        <Menu.Item component={Link} href={Routes.ProfileInfoPage({ id: user.id })}>
          Перейти в профиль
        </Menu.Item>
        <Menu.Item color="red" onClick={() => logoutMutation()}>
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <Group>
      <Button size="xs" variant="outline" component={Link} href={Routes.LoginPage()}>
        Войти
      </Button>
      <Button size="xs" component={Link} href={Routes.SignupPage()}>
        Зарегистрироваться
      </Button>
    </Group>
  )
}

const Header = () => {
  return (
    <MantineHeader height={60}>
      <Container h="100%">
        <Group position="apart" h="100%" noWrap>
          <Text weight="bold" size={28} component={Link} href={Routes.Home()}>
            ТРАЕКТОРИЯ
          </Text>
          <Group noWrap>
            <Navigation />
            <Suspense>
              <HeaderProfile />
            </Suspense>
          </Group>
        </Group>
      </Container>
    </MantineHeader>
  )
}

export default Header
