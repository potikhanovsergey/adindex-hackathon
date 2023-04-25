import {
  Accordion,
  AccordionControlProps,
  ActionIcon,
  Badge,
  Button,
  Center,
  Group,
  Menu,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core"
import { FC, ReactNode } from "react"
import AddCourseSectionButton from "./AddCourseSectionButton"
import { CoursePageProps } from "src/pages/courses/[id]"
import { IconDots, IconArrowUp, IconArrowDown, IconClockHour4 } from "@tabler/icons-react"
import AddCourseStepButton from "./AddCourseStepButton"
import CourseContentsStep from "./CourseContentsStep"
import { ExtendedSection } from "src/course/types"

const AccordionControl: FC<
  AccordionControlProps & { section: ExtendedSection; index: number; totalSections: number }
> = ({ section, index, totalSections, ...props }) => {
  return (
    <Group noWrap pr="xs">
      <Accordion.Control {...props} />
      <Group noWrap spacing={4}>
        {index !== 0 && (
          <ActionIcon>
            <IconArrowUp size="1rem" />
          </ActionIcon>
        )}
        {index !== totalSections - 1 && (
          <ActionIcon>
            <IconArrowDown size="1rem" />
          </ActionIcon>
        )}
        <Menu position="left">
          <Menu.Target>
            <ActionIcon>
              <IconDots size="1rem" />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item color="red">Удалить секцию</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>
    </Group>
  )
}

const CourseContentsWrapper: FC<CoursePageProps & { children: ReactNode }> = ({
  children,
  course,
}) => {
  return (
    <>
      <Title order={2} mb="md">
        Список секций
      </Title>
      {children}
      <AddCourseSectionButton mt="md" course={course} />
    </>
  )
}

const CourseContents: FC<CoursePageProps> = ({ course }) => {
  return (
    <CourseContentsWrapper course={course}>
      {course.sections.length === 0 ? (
        <>
          <Text>В курсе пока нет ни одной секции.</Text>
          <Text mb="md">Начните с добавления первой секции и хотя бы одного шага.</Text>
        </>
      ) : (
        <Accordion multiple variant="separated" chevronPosition="left">
          {course.sections.map((section, i) => (
            <Accordion.Item value={section.id + ""} key={section.id}>
              <AccordionControl totalSections={course.sections.length} section={section} index={i}>
                Секция {i + 1}.{" "}
                <Text color="green" span inherit>
                  {section.title}
                </Text>
              </AccordionControl>
              <Accordion.Panel>
                <Stack>
                  {section.steps.length > 0 ? (
                    section.steps.map((step, i) => (
                      <CourseContentsStep
                        section={section}
                        i={i}
                        courseId={course.id}
                        key={step.id}
                        {...step}
                      />
                    ))
                  ) : (
                    <Text>Пока что в секции нет шагов</Text>
                  )}
                </Stack>

                <AddCourseStepButton section={section} mt="md" variant="light" color="gray" />
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </CourseContentsWrapper>
  )
}

export default CourseContents
