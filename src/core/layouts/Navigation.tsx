import { Routes } from "@blitzjs/next"
import { Group } from "@mantine/core"
import Link from "../Link"
import { useRouter } from "next/router"

const navigationItems = [
  {
    label: "Все курсы",
    route: Routes.CoursesPage(),
  },
]

const Navigation = () => {
  const router = useRouter()

  return (
    <nav>
      <Group spacing="xl">
        {navigationItems.map((navItem) => (
          <Link
            key={navItem.label}
            size="sm"
            active={router.asPath === navItem.route.href}
            href={navItem.route}
          >
            {navItem.label}
          </Link>
        ))}
      </Group>
    </nav>
  )
}

export default Navigation
