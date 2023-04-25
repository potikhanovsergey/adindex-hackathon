import { ErrorBoundary, AppProps } from "@blitzjs/next"
import React, { FC } from "react"
import { withBlitz } from "src/blitz-client"
import { MantineProvider } from "@mantine/core"
import theme from "./theme"
import PageProgress from "src/core/components/PageProgress"
import RootErrorFallback from "src/core/components/RootErrorFallback"

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <PageProgress />
        {getLayout(<Component {...pageProps} />)}
      </MantineProvider>
    </ErrorBoundary>
  )
}

export default withBlitz(App)
