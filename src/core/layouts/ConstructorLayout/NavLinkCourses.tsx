import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import { NavLink } from "@mantine/core"
import { IconBook } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
import getCourses from "src/course/queries/getCourses"

const COURSE_SUBLINKS = [
  {
    label: "Редактирование",
    slug: "edit",
  },
  {
    label: "Участники",
    slug: "participants",
  },
  {
    label: "Прогресс",
    slug: "progress",
  },
]

const CHILDREN_OFFSET = 16

const NavLinksCourses: FC = () => {
  const [courses] = useQuery(getCourses, {})
  const router = useRouter()
  return (
    <NavLink
      defaultOpened={router.asPath.startsWith(`/courses/`)}
      label="Курсы"
      icon={<IconBook size="1rem" />}
      childrenOffset={CHILDREN_OFFSET}
    >
      {courses.map((course) => (
        <NavLink
          defaultOpened={router.asPath.startsWith(`/courses/${course.id}/`)}
          label={course.name}
          key={course.id}
          childrenOffset={CHILDREN_OFFSET}
        >
          {COURSE_SUBLINKS.map((sublink) => (
            <NavLink
              active={router.asPath === `/courses/${course.id}/${sublink.slug}`}
              key={sublink.slug}
              label={sublink.label}
              component={Link}
              href={`/courses/${course.id}/${sublink.slug}`}
            />
          ))}
        </NavLink>
      ))}
    </NavLink>
  )
}

export default NavLinksCourses
