import { BlitzPage } from "@blitzjs/next"
import { Title } from "@mantine/core"
import CompanyLayout from "src/core/layouts/CompanyLayout"

const CompanySettingsPage: BlitzPage = () => {
  return (
    <CompanyLayout>
      <Title align="center">Редактирование компании</Title>
    </CompanyLayout>
  )
}

export default CompanySettingsPage
