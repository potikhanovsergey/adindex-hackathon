import { Routes } from "@blitzjs/next"
import { Button } from "@mantine/core"
import { Company } from "@prisma/client"
import { useRouter } from "next/router"

const CompanyVacancies = ({ company }: { company: Company }) => {
  const router = useRouter()

  return (
    <>
      <Button onClick={() => router.push(Routes.CreateVacancyPage())}>Создать вакансию</Button>
    </>
  )
}

export default CompanyVacancies
