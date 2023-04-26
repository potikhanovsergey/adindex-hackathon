import { BlitzPage, Routes } from "@blitzjs/next"
import { Button, Group, Title } from "@mantine/core"
import { Company } from "@prisma/client"
import { GetServerSideProps } from "next"
import Link from "next/link"
import { useRouter } from "next/router"
import CompanyVacancies from "src/company/components/CompanyVacancies"
import { getCompanySSP } from "src/company/getSSP"
import CompanyLayout from "src/core/layouts/CompanyLayout"

const CompanyVacanciesPage: BlitzPage = ({ company }: { company: Company }) => {
  const router = useRouter()

  return (
    <CompanyLayout>
      <Group noWrap position="apart" mb="md">
        <Title size={24}>Вакансии компании {company.name}</Title>
        <Button component={Link} href={Routes.CreateVacancyPage()}>
          Создать вакансию
        </Button>
      </Group>
      <CompanyVacancies company={company} />
    </CompanyLayout>
  )
}

export default CompanyVacanciesPage

export const getServerSideProps: GetServerSideProps = getCompanySSP
