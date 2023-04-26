import { useQuery } from "@blitzjs/rpc"
import { Stack } from "@mantine/core"
import { Company } from "@prisma/client"
import VacancyCard, { ExtendedVacancy } from "src/vacancy/components/VacancyCard"
import getVacancies from "src/vacancy/queries/getVacancies"

const CompanyVacancies = ({
  company,
  withUserButton = false,
}: {
  company: Company
  withUserButton?: boolean
}) => {
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
        <VacancyCard
          vacancy={vacancy as ExtendedVacancy}
          key={vacancy.id}
          withUserButton={withUserButton}
        />
      ))}
    </Stack>
  )
}

export default CompanyVacancies
