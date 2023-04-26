import { BlitzPage } from "@blitzjs/next"
import { Title } from "@mantine/core"
import { GetServerSideProps } from "next"
import CompanyRequests from "src/company/components/CompanyRequests"
import { getCompanySSP } from "src/company/getSSP"
import { ExtendedCompany } from "src/company/types"
import CompanyLayout from "src/core/layouts/CompanyLayout"

const CompanyVacanciesRequestsPage: BlitzPage = ({ company }: { company: ExtendedCompany }) => {
  return (
    <CompanyLayout>
      <Title size={24} mb="md">
        Заявки на вакансии компании {company.name}
      </Title>
      <CompanyRequests company={company} />
    </CompanyLayout>
  )
}

export default CompanyVacanciesRequestsPage

export const getServerSideProps: GetServerSideProps = getCompanySSP
