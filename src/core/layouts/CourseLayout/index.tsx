import {
  Container,
  AppShell,
  Stack,
  Divider,
  Box,
  ActionIcon,
  rem,
  useMantineTheme,
} from "@mantine/core"
import { FC, ReactNode, useMemo } from "react"
import { CourseStepPageProps, ExtendedCourse, ExtendedCourseStep } from "src/course/types"
import Header from "../Header"
import CourseAside from "./CourseAside"
import CourseTabs from "./CourseTabs"
import { Routes, useParam } from "@blitzjs/next"
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react"
import Link from "next/link"

interface CourseLayoutProps {
  children: ReactNode
  step: CourseStepPageProps
}

const CourseLayout: FC<CourseLayoutProps> = ({ children, step }) => {
  const theme = useMantineTheme()

  const indexOfCurrentStep = step.section.steps.findIndex((s) => s.id === step.id)
  const indexOfCurrentSection = step.section.course.sections.findIndex(
    (s) => s.id === step.section.id
  )
  const currentSection = step.section.course.sections[indexOfCurrentSection]

  const nextStep = useMemo(() => {
    if (
      indexOfCurrentStep === currentSection.steps.length - 1 && // последний шаг в секции
      indexOfCurrentSection < step.section.course.sections.length - 1 // не последняя секция
    ) {
      return step.section.course.sections[indexOfCurrentSection + 1].steps[0] // возвращаем первый шаг в следующей секции
    }
    return step.section.steps[indexOfCurrentStep + 1] as ExtendedCourseStep | undefined // возвращаем следующий шаг этой секции или ничего (то есть если сеция последняя)
  }, [
    currentSection.steps.length,
    indexOfCurrentSection,
    indexOfCurrentStep,
    step.section.course.sections,
    step.section.steps,
  ])

  const prevStep = useMemo(() => {
    // первый шаг в секции и не первая секция
    if (indexOfCurrentStep === 0 && indexOfCurrentSection !== 0) {
      // возвращаем последний шаг в предыдущей секции
      return step.section.course.sections[indexOfCurrentSection - 1].steps[
        step.section.course.sections[indexOfCurrentSection - 1].steps.length - 1
      ]
    }
    // возвращаем предыдущей шаг этой секции или ничего (то есть если секция первая)
    return step.section.steps[indexOfCurrentStep - 1] as ExtendedCourseStep | undefined
  }, [indexOfCurrentSection, indexOfCurrentStep, step.section.course.sections, step.section.steps])

  return (
    <AppShell
      styles={{ main: { paddingLeft: 0, paddingRight: "var(--mantine-aside-width)" } }}
      aside={<CourseAside course={step.section.course} />}
      header={<Header />}
    >
      <Box sx={{ position: "relative" }}>
        <Container px={64}>
          {children}
          {prevStep && (
            <ActionIcon
              component={Link}
              href={Routes.CourseLearn({ id: step.section.course.id, stepId: prevStep.id })}
              sx={{
                position: "absolute",
                top: "50%",
                left: theme.spacing.xs,
                transform: "translateY(-50%)",
                "&:active": {
                  transform: "translateY(-50%)",
                },
              }}
            >
              <IconChevronLeft />
            </ActionIcon>
          )}
          {nextStep && (
            <ActionIcon
              component={Link}
              href={Routes.CourseLearn({ id: step.section.course.id, stepId: nextStep.id })}
              sx={{
                position: "absolute",
                top: "50%",
                right: theme.spacing.xs,
                transform: "translateY(-50%)",
                "&:active": {
                  transform: "translateY(-50%)",
                },
              }}
            >
              <IconChevronRight />
            </ActionIcon>
          )}
        </Container>
      </Box>
      <Container>
        <Divider my="md" />
        <CourseTabs />
      </Container>
    </AppShell>
  )
}

export default CourseLayout
