import { useQuery } from "@blitzjs/rpc"
import { Stack } from "@mantine/core"
import { Company } from "@prisma/client"
import { useRouter } from "next/router"
import VacancyCard, { ExtendedVacancy } from "src/vacancy/components/VacancyCard"
import getVacancies from "src/vacancy/queries/getVacancies"

const CompanyVacancies = ({ company }: { company: Company }) => {
  const router = useRouter()

  const [vacancies] = useQuery(getVacancies, {
    where: {
      companyId: {
        equals: company.id,
      },
    },
    include: {
      company: true,
    },
  })

  return (
    <Stack>
      {vacancies.map((vacancy) => (
        <VacancyCard vacancy={vacancy as ExtendedVacancy} key={vacancy.id} />
      ))}
    </Stack>
  )
}

export default CompanyVacancies
