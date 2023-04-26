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
  UnstyledButton,
  Loader,
} from "@mantine/core"
import Link from "next/link"
import logout from "src/auth/mutations/logout"
import { Suspense } from "react"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import Navigation from "./Navigation"
import Logo from "./Logo"
import UserAvatar from "../components/UserAvatar"

const HeaderProfile = () => {
  const user = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  const fullName = user
    ? [user.lastName, user.firstName, user.patronymic].filter(Boolean).join(" ")
    : null

  return user ? (
    <Menu withinPortal>
      <Menu.Target>
        <UnstyledButton>
          <UserAvatar user={user} alt="Avatar" />
        </UnstyledButton>
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

        {user.company && (
          <>
            <Menu.Item component={Link} href={Routes.CompanySettingsPage({ id: user.company.id })}>
              {user.company.name}
            </Menu.Item>
            <Menu.Divider />
          </>
        )}

        <Menu.Item component={Link} href={Routes.ProfileSettings({ id: user.id })}>
          Перейти в профиль
        </Menu.Item>
        <Menu.Item color="red" onClick={() => logoutMutation()}>
          Выйти
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  ) : (
    <Group spacing="xs">
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
    <MantineHeader fixed height={80}>
      <Container h="100%">
        <Group position="apart" h="100%" noWrap>
          <Group noWrap spacing="xl">
            <Link href={Routes.Home()}>
              <Logo w={50} />
            </Link>
            <Navigation />
          </Group>
          <Suspense fallback={<Loader />}>
            <HeaderProfile />
          </Suspense>
        </Group>
      </Container>
    </MantineHeader>
  )
}

export default Header
