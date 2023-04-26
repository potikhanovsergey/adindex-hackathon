import { Container, AppShell } from "@mantine/core"
import { FC, ReactNode } from "react"
import Header from "../Header"
import Footer from "../Footer"
import CompanyNavbar from "./CompanyNavbar"

interface CompanyLayoutProps {
  children: ReactNode
}

const CompanyLayout: FC<CompanyLayoutProps> = ({ children }) => {
  return (
    <AppShell footer={<Footer />} navbar={<CompanyNavbar />} header={<Header />}>
      <Container>{children}</Container>
    </AppShell>
  )
}

export default CompanyLayout
