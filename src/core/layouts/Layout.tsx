import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell } from "@mantine/core"
import Header from "./Header"
import { font } from "src/theme"

const Layout: BlitzLayout<{ title?: string; children?: React.ReactNode }> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title || "fs-template"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AppShell className={font.variable} header={<Header />}>
        {children}
      </AppShell>
    </>
  )
}

export default Layout
