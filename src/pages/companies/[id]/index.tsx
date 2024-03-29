import { BlitzPage } from "@blitzjs/next"
import { Container, Title, Text, Loader } from "@mantine/core"
import { GetServerSideProps } from "next"
import { Suspense } from "react"
import CompanyEvents from "src/company/components/CompanyEvents"
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
          <Suspense fallback={<Loader />}>
            <CompanyVacancies company={company} withUserButton={true} />
          </Suspense>
        ) : (
          <Text>У компании пока нет вакансий</Text>
        )}

        <Title order={2} my="sm">
          События
        </Title>
        {company.events.length > 0 ? (
          <Suspense fallback={<Loader />}>
            <CompanyEvents company={company} />
          </Suspense>
        ) : (
          <Text>У компании пока нет событий</Text>
        )}
      </Container>
    </Layout>
  )
}

export default CompanyProfilePage

export const getServerSideProps: GetServerSideProps = getCompanySSP
