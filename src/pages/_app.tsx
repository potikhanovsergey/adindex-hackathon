import { ErrorBoundary, AppProps } from "@blitzjs/next"
import React, { FC } from "react"
import { withBlitz } from "src/blitz-client"
import { MantineProvider } from "@mantine/core"
import theme from "../theme"
import PageProgress from "src/core/components/PageProgress"
import RootErrorFallback from "src/core/components/RootErrorFallback"
import "src/flow/components/Flow/index.css"
import { ModalsProvider } from "@mantine/modals"
import { Notifications } from "@mantine/notifications"
import "dayjs/locale/ru"

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      {/* <FontProvider> */}
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <ModalsProvider>
          <Notifications />
          <PageProgress />
          {getLayout(<Component {...pageProps} />)}
        </ModalsProvider>
      </MantineProvider>
      {/* </FontProvider> */}
    </ErrorBoundary>
  )
}

export default withBlitz(App)
