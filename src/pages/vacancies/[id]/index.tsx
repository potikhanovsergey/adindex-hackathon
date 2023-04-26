import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { getVacancySSP } from "src/vacancy/getSSP"
import { GetServerSideProps } from "next"
import { ExtendedVacancy } from "src/vacancy/components/VacancyCard"
import { Group, Stack, Title, Text, Button, Grid } from "@mantine/core"
import CompanyCard from "src/company/components/CompanyCard"

const VacancyPage: BlitzPage = ({ vacancy }: { vacancy: ExtendedVacancy }) => {
  return (
    <Layout>
      <Grid>
        <Grid.Col span={9}>
          <Stack align="flex-start" spacing={0}>
            <Title size={24} mb="xs">
              {vacancy.title}
            </Title>
            <Text size="xl" mb="xs">
              {vacancy.salary} ₽
            </Text>
            <Text>Стажировка</Text>
            <Text>Полная занятость</Text>
            <Text>Удаленная работа</Text>
            <Button mt="xl">Откликнуться</Button>
          </Stack>
        </Grid.Col>
        <Grid.Col span={3}>
          <CompanyCard company={vacancy.company} />
        </Grid.Col>
      </Grid>
      <div dangerouslySetInnerHTML={{ __html: vacancy.description || "" }} />
    </Layout>
  )
}

export default VacancyPage

export const getServerSideProps: GetServerSideProps = getVacancySSP
