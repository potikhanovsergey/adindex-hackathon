import React, { ReactNode } from "react"
import { BlitzLayout } from "@blitzjs/next"

interface LayoutProps {
  children?: ReactNode
}

const Layout: BlitzLayout<LayoutProps> = ({ children }) => {
  return <>{children}</>
}

export default Layout
