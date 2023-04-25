import { FC } from "react"
import { Button, Group, Footer as MantineFooter } from "@mantine/core"
import Logo from "./Logo"

const Footer: FC = () => {
  return (
    <MantineFooter height="auto">
      <Group position="apart">
        <Logo w={50} />
        <Button>Создать компанию</Button>
      </Group>
    </MantineFooter>
  )
}

export default Footer
