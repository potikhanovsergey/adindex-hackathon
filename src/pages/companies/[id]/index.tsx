import { BlitzPage } from "@blitzjs/next"
import { Container, Title } from "@mantine/core"
import Layout from "src/core/layouts/Layout"

const CompanyProfilePage: BlitzPage = () => {
  return (
    <Layout>
      <Container size={680} my="xl">
        <Title align="center">Компания</Title>
      </Container>
    </Layout>
  )
}

export default CompanyProfilePage
