import { Container, AppShell } from "@mantine/core"
import { FC, ReactNode } from "react"
import Header from "../Header"
import ProfileNavbar from "./ProfileNavbar"
import Footer from "../Footer"

interface ProfileLayoutProps {
  children: ReactNode
}

const ProfileLayout: FC<ProfileLayoutProps> = ({ children }) => {
  return (
    <AppShell footer={<Footer />} navbar={<ProfileNavbar />} header={<Header />}>
      <Container>{children}</Container>
    </AppShell>
  )
}

export default ProfileLayout
