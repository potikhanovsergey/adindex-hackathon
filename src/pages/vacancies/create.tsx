import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Container, Title } from "@mantine/core"
import { Suspense } from "react"
import CreateVacancyForm from "src/vacancy/components/CreateVacancyForm"

const CreateVacancyPage: BlitzPage = () => {
  return (
    <Layout>
      <Container size={680} my="xl">
        <Title align="center">Создание вакансии</Title>
        <Suspense>
          <CreateVacancyForm />
        </Suspense>
      </Container>
    </Layout>
  )
}

export default CreateVacancyPage
