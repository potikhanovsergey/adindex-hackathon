import { BlitzPage } from "@blitzjs/next"
import { Container, Title, Text } from "@mantine/core"
import { GetServerSideProps } from "next"
import { Suspense } from "react"
import CompanyProfileHeader from "src/company/components/CompanyProfileHeader"
import CompanyVacancies from "src/company/components/CompanyVacancies"
import { getCompanySSP } from "src/company/getSSP"
import { ExtendedCompany } from "src/company/types"
import Layout from "src/core/layouts/Layout"

const CompanyProfilePage: BlitzPage = ({ company }: { company: ExtendedCompany }) => {
  return (
    <Layout>
      <Container my="xl">
        <CompanyProfileHeader company={company} />

        <div dangerouslySetInnerHTML={{ __html: company.description || "" }} />

        <Title order={2} mb="sm">
          Вакансии
        </Title>
        {company.vacancies.length > 0 ? (
          <Suspense>
            <CompanyVacancies company={company} withUserButton={true} />
          </Suspense>
        ) : (
          <Text>У компании пока нет вакансий</Text>
        )}
      </Container>
    </Layout>
  )
}

export default CompanyProfilePage

export const getServerSideProps: GetServerSideProps = getCompanySSP
