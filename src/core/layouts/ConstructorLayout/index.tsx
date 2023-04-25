import React, { ReactNode } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell } from "@mantine/core"
import Header from "../Header"
import ConstructorNavbar from "./ConstructorNavbar"
import Footer from "../Footer"

interface ConstructorLayoutProps {
  children: ReactNode
}

const ConstructorLayout: BlitzLayout<ConstructorLayoutProps> = ({ children }) => {
  return (
    <AppShell footer={<Footer />} navbar={<ConstructorNavbar />} header={<Header />}>
      {children}
    </AppShell>
  )
}

export default ConstructorLayout
