import { Routes } from "@blitzjs/next"
import { Button, Group } from "@mantine/core"
import Link from "next/link"
import { useRouter } from "next/router"

const navigationItems = [
  {
    label: "Вакансии",
    route: Routes.VacanciesPage(),
  },
  {
    label: "События",
    route: Routes.EventsPage(),
  },
  {
    label: "Курсы",
    route: Routes.CoursesPage(),
  },
  {
    label: "Лидерборд",
    route: Routes.LeaderBoard(),
  },
]

const Navigation = () => {
  return (
    <nav>
      <Group spacing="xs">
        {navigationItems.map((navItem) => (
          <Button component={Link} variant="subtle" key={navItem.label} href={navItem.route}>
            {navItem.label}
          </Button>
        ))}
      </Group>
    </nav>
  )
}

export default Navigation
