import { Paper, Text, Group, Badge, Center, ActionIcon, Menu, Button, Tooltip } from "@mantine/core"
import {
  IconClockHour4,
  IconArrowUp,
  IconArrowDown,
  IconDots,
  IconPencil,
  IconTrash,
} from "@tabler/icons-react"
import { FC } from "react"
import { getStepTypeIcon, STEP_TYPE_LABEL } from "./utils"
import { ExtendedCourseStep, ExtendedSection } from "src/course/types"
import { useMutation } from "@blitzjs/rpc"
import deleteCourseStep from "src/course/mutations/deleteCourseStep"
import { modals } from "@mantine/modals"
import { Routes } from "@blitzjs/next"
import Link from "src/core/Link"
import { sectionForEditableStep, courseStepType } from "./store"
import { COURSE_STEP_TYPE_EDIT_ID, COURSE_STEP_MODAL_SIZE } from "./AddCourseStepButton"
import CourseStepTypeEdit from "./CourseStepTypeEdit"
import CourseStepTypeEditLabel from "./CourseStepTypeEditLabel"

const CourseContentsStep: FC<
  ExtendedCourseStep & { i: number; courseId: number; section: ExtendedSection }
> = ({ i, courseId, section, ...step }) => {
  const handleEditClick = () => {
    sectionForEditableStep.set(section)
    courseStepType.set(step.type)

    modals.open({
      modalId: COURSE_STEP_TYPE_EDIT_ID,
      size: COURSE_STEP_MODAL_SIZE,
      title: <CourseStepTypeEditLabel />,
      children: <CourseStepTypeEdit step={step} />,
    })
  }

  const [deleteCourseStepMutation] = useMutation(deleteCourseStep)

  const openDeleteModal = () =>
    modals.openConfirmModal({
      title: "Вы действительно хотите удалить шаг курса?",
      centered: true,
      children: <Text size="sm">После удаления шага его нельзя будет восстановить.</Text>,
      labels: { confirm: "Удалить шаг курса", cancel: "Отмена" },
      confirmProps: { color: "red" },
      onCancel: () => console.log("Cancel"),
      onConfirm: async () => {
        await deleteCourseStepMutation({
          where: {
            id: step.id,
          },
          select: {
            section: {
              include: {
                steps: true,
              },
            },
          },
        })
      },
    })

  return (
    <Paper p="sm">
      <Group noWrap position="apart">
        <div>
          <Group noWrap spacing="xs" mb={8}>
            <Text>
              Шаг {i + 1}.{" "}
              <Link
                href={Routes.CourseLearn({ id: courseId, stepId: step.id })}
                target="_blank"
                span
                inherit
                color="yellow"
                weight="bold"
              >
                {step.title}
              </Link>
            </Text>
          </Group>
          <Group spacing="xs">
            <Badge
              leftSection={
                <Center>
                  <IconClockHour4 size="0.75rem" />
                </Center>
              }
            >
              {step.duration} мин
            </Badge>
            <Badge
              leftSection={
                <Center fs="0.75rem">
                  {getStepTypeIcon({ icon: step.type, size: "0.75rem" })}
                </Center>
              }
            >
              {STEP_TYPE_LABEL[step.type]}
            </Badge>
          </Group>
        </div>

        <Group noWrap spacing={4}>
          {i !== 0 && (
            <Tooltip label="Выше">
              <ActionIcon>
                <IconArrowUp size="1rem" />
              </ActionIcon>
            </Tooltip>
          )}

          {i !== section.steps.length - 1 && (
            <Tooltip label="Ниже">
              <ActionIcon>
                <IconArrowDown size="1rem" />
              </ActionIcon>
            </Tooltip>
          )}
          <Menu position="left">
            <Menu.Target>
              <Tooltip label="Настройки">
                <ActionIcon>
                  <IconDots size="1rem" />
                </ActionIcon>
              </Tooltip>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item onClick={handleEditClick} icon={<IconPencil size="1rem" />}>
                Редактировать шаг
              </Menu.Item>
              <Menu.Item onClick={openDeleteModal} icon={<IconTrash size="1rem" />} color="red">
                Удалить шаг
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </Paper>
  )
}

export default CourseContentsStep
