import React, { ReactNode } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell } from "@mantine/core"
import Header from "../Header"
import ConstructorNavbar from "./ConstructorNavbar"

interface ConstructorLayoutProps {
  children: ReactNode
}

const ConstructorLayout: BlitzLayout<ConstructorLayoutProps> = ({ children }) => {
  return (
    <AppShell navbar={<ConstructorNavbar />} header={<Header />}>
      {children}
    </AppShell>
  )
}

export default ConstructorLayout
