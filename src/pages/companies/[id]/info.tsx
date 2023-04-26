import { BlitzPage } from "@blitzjs/auth"
import { Title } from "@mantine/core"
import { Company, User } from "@prisma/client"
import { GetServerSideProps } from "next"
import CompanyLayout from "src/core/layouts/CompanyLayout"
import { getCompanySSP } from "src/company/getSSP"

const CompanyInfoPage: BlitzPage = ({ company }: { company: Company }) => {
  return (
    <CompanyLayout>
      <Title>{company.name}</Title>
    </CompanyLayout>
  )
}

export default CompanyInfoPage

export const getServerSideProps: GetServerSideProps = getCompanySSP
