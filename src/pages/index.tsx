import Layout from "src/core/layouts/Layout"
import { BlitzPage } from "@blitzjs/next"
import { Button } from "@mantine/core"

const Home: BlitzPage = () => {
  return (
    <Layout>
      <Button>Test button</Button>
    </Layout>
  )
}

export default Home
