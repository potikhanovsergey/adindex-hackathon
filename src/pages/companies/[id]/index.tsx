import { BlitzPage } from "@blitzjs/next"
import { Container, Title } from "@mantine/core"
import { Company } from "@prisma/client"
import { GetServerSideProps } from "next"
import { getCompanySSP } from "src/company/getSSP"
import Layout from "src/core/layouts/Layout"

const CompanyProfilePage: BlitzPage = ({ company }: { company: Company }) => {
  return (
    <Layout>
      <Container size={680} my="xl">
        <Title align="center">Компания</Title>
      </Container>
    </Layout>
  )
}

export default CompanyProfilePage

export const getServerSideProps: GetServerSideProps = getCompanySSP
