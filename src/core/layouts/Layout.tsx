import Head from "next/head"
import React from "react"
import { BlitzLayout } from "@blitzjs/next"
import { AppShell } from "@mantine/core"
// import { nunitoFont } from "src/pages/theme"
import Header from "./Header"

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
      <AppShell
        // className={nunitoFont.variable}
        header={<Header />}
      >
        {children}
      </AppShell>
    </>
  )
}

export default Layout
