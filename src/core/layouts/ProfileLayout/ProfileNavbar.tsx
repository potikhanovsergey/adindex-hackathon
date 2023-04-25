import { FC } from "react"
import { Navbar, NavLink } from "@mantine/core"
import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"
import Link from "next/link"

const PROFILE_SUBLINKS = [
  {
    label: "Публичный профиль",
    slug: "info",
  },
  {
    label: "Редактирование профиля",
    slug: "settings",
  },
]

const ProfileNavbar: FC = () => {
  const param = useParam("id")

  const router = useRouter()

  return (
    <Navbar width={{ base: 256 }}>
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
