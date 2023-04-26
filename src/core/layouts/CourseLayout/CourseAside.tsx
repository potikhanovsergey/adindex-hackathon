import { FC } from "react"
import { Aside, Checkbox, Group, NavLink } from "@mantine/core"
import { CoursePageProps } from "src/pages/courses/[id]"
import { IconClockHour5 } from "@tabler/icons-react"
import Link from "next/link"
import { Routes, useParam } from "@blitzjs/next"
import { useRouter } from "next/router"

const CourseAside: FC<CoursePageProps> = ({ course }) => {
  const router = useRouter()

  const stepId = useParam("stepId")

  return (
    <Aside fixed width={{ base: 256 }}>
      {course.sections.map((section) =>
        section.steps.length > 0 ? (
          <NavLink
            defaultOpened={Boolean(stepId && section.steps.some((step) => step.id === +stepId))}
            key={section.id}
            label={section.title}
            description={
              <Group noWrap spacing={4}>
                <IconClockHour5 size={16} stroke={1.5} />
                {`${section.steps.reduce((acc, step) => step.duration + acc, 0)} мин.`}
              </Group>
            }
          >
            {section.steps.map((step) => (
              <NavLink
                active={
                  router.asPath === Routes.CourseLearn({ id: course.id, stepId: step.id }).href
                }
                key={step.id}
                label={step.title}
                description={
                  <Group noWrap spacing={4}>
                    <IconClockHour5 size={16} stroke={1.5} />
                    {`${step.duration} мин.`}
                  </Group>
                }
                component={Link}
                href={Routes.CourseLearn({ id: course.id, stepId: step.id })}
              />
            ))}
          </NavLink>
        ) : (
          <NavLink key={section.id} label={section.title} icon={<Checkbox size="xs" />} />
        )
      )}
    </Aside>
  )
}

export default CourseAside
