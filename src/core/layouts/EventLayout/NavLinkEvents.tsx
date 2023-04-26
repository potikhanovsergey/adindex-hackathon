import { useQuery } from "@blitzjs/rpc"
import { NavLink } from "@mantine/core"
import { IconBook } from "@tabler/icons-react"
import Link from "next/link"
import { useRouter } from "next/router"
import { FC } from "react"
import getEvents from "src/event/queries/getEvents"

const COURSE_SUBLINKS = [
  {
    label: "Редактирование",
    slug: "edit",
  },
  {
    label: "Участники",
    slug: "participants",
  },
]

const CHILDREN_OFFSET = 16

const NavLinksEvents: FC = () => {
  const [events] = useQuery(getEvents, {})
  const router = useRouter()
  return (
    <NavLink
      defaultOpened={router.asPath.startsWith(`/events/`)}
      label="События"
      childrenOffset={CHILDREN_OFFSET}
    >
      {events.map((course) => (
        <NavLink
          defaultOpened={router.asPath.startsWith(`/events/${course.id}/`)}
          label={course.name}
          key={course.id}
          childrenOffset={CHILDREN_OFFSET}
        >
          {COURSE_SUBLINKS.map((sublink) => (
            <NavLink
              active={router.asPath === `/events/${course.id}/${sublink.slug}`}
              key={sublink.slug}
              label={sublink.label}
              component={Link}
              href={`/events/${course.id}/${sublink.slug}`}
            />
          ))}
        </NavLink>
      ))}
    </NavLink>
  )
}

export default NavLinksEvents
