import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell } from "@mantine/core"
import Header from "./Header"
import Footer from "./Footer"

const Layout: BlitzLayout<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <AppShell fixed={false} footer={<Footer />} header={<Header />}>
      {children}
    </AppShell>
  )
}

export default Layout
