import { BlitzPage } from "@blitzjs/next"
import { Container, Loader, Title } from "@mantine/core"
import { Suspense } from "react"
import CreateCompanyForm from "src/company/components/CreateCompanyForm"
import Layout from "src/core/layouts/Layout"

const CreateCompanyPage: BlitzPage = () => {
  return (
    <Layout>
      <Container size={680} my="xl">
        <Title align="center">Создание компании</Title>
        <Suspense fallback={<Loader />}>
          <CreateCompanyForm />
        </Suspense>
      </Container>
    </Layout>
  )
}

export default CreateCompanyPage
