import { useSession } from "@blitzjs/auth"
import { Routes } from "@blitzjs/next"
import { useMutation, invalidateQuery } from "@blitzjs/rpc"
import { Text, Paper, Button, Group, Avatar, TextInput } from "@mantine/core"
import { useForm } from "@mantine/form"
import { closeAllModals, modals } from "@mantine/modals"
import { notifications } from "@mantine/notifications"
import { Company, Vacancy } from "@prisma/client"
import { useEditor } from "@tiptap/react"
import { FC, Suspense } from "react"
import RichTextarea, { RichTextareaExtensions } from "src/core/components/RichTextarea"
import Link from "src/core/Link"
import getCourses from "src/course/queries/getCourses"
import createRequest from "src/requests/mutations/createRequest"
import { useCurrentUser } from "src/users/hooks/useCurrentUser"
import getVacancies from "../queries/getVacancies"
import CreateRequestButton from "./CreateRequestButton"

export interface ExtendedVacancy extends Vacancy {
  company: Company
}

const VacancyCard = ({
  vacancy,
  withUserButton = false,
}: {
  vacancy: ExtendedVacancy
  withUserButton?: boolean
}) => {
  return (
    <Paper p="sm">
      <Link href={Routes.VacancyPage({ id: vacancy.id })} target="_blank" mb={4}>
        <Text weight="bold">{vacancy.title}</Text>
      </Link>
      <Text size="lg" mb="xs">
        {vacancy.salary} ₽
      </Text>
      <Group position="apart">
        <Group spacing={4}>
          <Avatar size="sm">{vacancy.company.name.substring(0, 1)}</Avatar>
          <Text>{vacancy.company.name}</Text>
        </Group>
        {withUserButton && (
          <Suspense>
            <CreateRequestButton vacancy={vacancy} />
          </Suspense>
        )}
      </Group>
    </Paper>
  )
}

export default VacancyCard
