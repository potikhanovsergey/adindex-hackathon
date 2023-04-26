import { BlitzPage } from "@blitzjs/next"
import { Title } from "@mantine/core"
import { Company } from "@prisma/client"
import { GetServerSideProps } from "next"
import CompanyVacancies from "src/company/components/CompanyVacancies"
import { getCompanySSP } from "src/company/getSSP"
import CompanyLayout from "src/core/layouts/CompanyLayout"

const CompanyVacanciesPage: BlitzPage = ({ company }: { company: Company }) => {
  return (
    <CompanyLayout>
      <Title align="center">Вакансии компании {company.name}</Title>
      <CompanyVacancies company={company} />
    </CompanyLayout>
  )
}

export default CompanyVacanciesPage

export const getServerSideProps: GetServerSideProps = getCompanySSP
