import { Routes } from "@blitzjs/next"
import { Button, Navbar, ScrollArea } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import Link from "next/link"
import { FC, Suspense } from "react"
import NavLinksEvents from "./NavLinkEvents"

const EventNavbar: FC = () => {
  return (
    <Navbar px="sm" py="md" width={{ base: 256 }}>
      <ScrollArea>
        <Button
          component={Link}
          href={Routes.CreateEventPage()}
          variant="outline"
          w="fit-content"
          rightIcon={<IconPlus size="1rem" />}
          mb="md"
        >
          Новое событие
        </Button>
        <Suspense>
          <NavLinksEvents />
        </Suspense>
      </ScrollArea>
    </Navbar>
  )
}

export default EventNavbar
