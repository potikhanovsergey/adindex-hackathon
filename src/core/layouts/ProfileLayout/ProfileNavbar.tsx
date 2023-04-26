import { FC } from "react"
import { Navbar, NavLink } from "@mantine/core"
import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"
import Link from "next/link"

const PROFILE_SUBLINKS = [
  {
    label: "Редактирование профиля",
    slug: "settings",
  },
  {
    label: "Достижения",
    slug: "achievements",
  },
]

const ProfileNavbar: FC = () => {
  const param = useParam("id")

  const router = useRouter()

  return (
    <Navbar width={{ base: 256 }} fixed>
      <NavLink
        label="Публичный профиль"
        description="Вы перейдете на страницу профиля"
        component={Link}
        href={`/profile/${param}`}
      />
      {PROFILE_SUBLINKS.map((sublink) => (
        <NavLink
          active={router.asPath === `/profile/${param}/${sublink.slug}`}
          key={sublink.slug}
          label={sublink.label}
          component={Link}
          href={`/profile/${param}/${sublink.slug}`}
        />
      ))}
    </Navbar>
  )
}

export default ProfileNavbar
