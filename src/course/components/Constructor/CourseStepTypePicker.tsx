import { FC } from "react"
import CourseStepTypeCard, { CourseStepTypeCardProps } from "./CourseStepTypeCard"
import { SimpleGrid, Text } from "@mantine/core"
import { CourseStepType } from "@prisma/client"
import { useSelector } from "@legendapp/state/react"
import { courseStepType } from "./store"
import { getStepTypeIcon } from "./utils"

const cards: Omit<CourseStepTypeCardProps, "isActive">[] = [
  {
    description: "Добавьте текст, ссылки, картинки или материалы",
    icon: getStepTypeIcon({ icon: CourseStepType.text, size: "1.5rem" }),
    slug: CourseStepType.text,
  },
  {
    description: "Загрузите видео или оставьте ссылку",
    icon: getStepTypeIcon({ icon: CourseStepType.video, size: "1.5rem" }),
    slug: CourseStepType.video,
  },
  // {
  //   description: "Создайте тест для проверки знаний участников курса",
  //   icon: getStepTypeIcon({ icon: CourseStepType.test, size: "1.5rem" }),
  //   slug: CourseStepType.test,
  // },
  // {
  //   description: "Попросите участников оставить отзыв о курсе",
  //   icon: getStepTypeIcon({ icon: CourseStepType.review, size: "1.5rem" }),
  //   slug: CourseStepType.review,
  // },
]

const CourseStepTypePicker: FC = () => {
  const courseStepTypeValue = useSelector(courseStepType)

  return (
    <div>
      <Text color="dimmed">После создания шага его тип уже нельзя будет изменить</Text>
      <SimpleGrid my="md" cols={2} spacing="md">
        {cards.map((card) => (
          <CourseStepTypeCard
            isActive={courseStepTypeValue === card.slug}
            onClick={() => courseStepType.set(card.slug)}
            key={card.slug}
            {...card}
          />
        ))}
      </SimpleGrid>
    </div>
  )
}

export default CourseStepTypePicker
