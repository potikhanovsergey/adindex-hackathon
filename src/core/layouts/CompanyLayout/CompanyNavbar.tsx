import { FC } from "react"
import { Group, Navbar, NavLink, Text } from "@mantine/core"
import { useParam } from "@blitzjs/next"
import { useRouter } from "next/router"
import Link from "next/link"
import { IconExternalLink } from "@tabler/icons-react"

const COMPANY_SUBLINKS = [
  {
    label: "Редактирование профиля компании",
    slug: "settings",
  },
  {
    label: "Вакансии",
    slug: "vacancies",
  },
  {
    label: "Заявки на вакансии",
    slug: "requests",
  },
  {
    label: "Предложения вакансий",
    slug: "invitations",
  },
]

const CompanyNavbar: FC = () => {
  const param = useParam("id")

  const router = useRouter()

  return (
    <Navbar width={{ base: 256 }}>
      <NavLink
        label="Публичный профиль"
        description="Вы перейдете на страницу профиля компании"
        component={Link}
        href={`/companies/${param}`}
      />
      {COMPANY_SUBLINKS.map((sublink) => (
        <NavLink
          active={router.asPath === `/companies/${param}/${sublink.slug}`}
          key={sublink.slug}
          label={sublink.label}
          component={Link}
          href={`/companies/${param}/${sublink.slug}`}
        />
      ))}
    </Navbar>
  )
}

export default CompanyNavbar
