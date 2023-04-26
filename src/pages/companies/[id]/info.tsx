import { BlitzPage } from "@blitzjs/auth"
import CompanyLayout from "src/core/layouts/CompanyLayout"
import CompanyProfilePage from "."

const CompanyInfoPage: BlitzPage = () => {
  return (
    <CompanyLayout>
      <CompanyProfilePage />
    </CompanyLayout>
  )
}

export default CompanyInfoPage
