import { FC } from "react"
import { Button, Container, Group, Footer as MantineFooter } from "@mantine/core"
import Logo from "./Logo"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

const Footer: FC = () => {
  return (
    <MantineFooter fixed={false} height={128} bg="black">
      <Container h="100%">
        <Group h="100%" position="apart">
          <Logo isDarkTheme w={50} />
          <Button component={Link} href={Routes.CreateCompanyPage()} variant="subtle">
            Создать компанию
          </Button>
        </Group>
      </Container>
    </MantineFooter>
  )
}

export default Footer
