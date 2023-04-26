import React, { ReactNode } from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell } from "@mantine/core"
import Header from "../Header"
import Navbar from "./Navbar"

interface EventLayoutProps {
  children: ReactNode
}

const EventLayout: BlitzLayout<EventLayoutProps> = ({ children }) => {
  return (
    <AppShell navbar={<Navbar />} header={<Header />}>
      {children}
    </AppShell>
  )
}

export default EventLayout
