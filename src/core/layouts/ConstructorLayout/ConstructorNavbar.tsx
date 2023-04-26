import { Routes } from "@blitzjs/next"
import { Button, Loader, Navbar, ScrollArea } from "@mantine/core"
import { IconPlus } from "@tabler/icons-react"
import Link from "next/link"
import { FC, Suspense } from "react"
import NavLinksCourses from "./NavLinkCourses"

const ConstructorNavbar: FC = () => {
  return (
    <Navbar px="sm" py="md" width={{ base: 256 }}>
      <ScrollArea>
        <Button
          fullWidth
          component={Link}
          href={Routes.NewCoursePage()}
          variant="outline"
          rightIcon={<IconPlus size="1rem" />}
          mb="md"
        >
          Новый курс
        </Button>
        <Suspense fallback={<Loader />}>
          <NavLinksCourses />
        </Suspense>
      </ScrollArea>
    </Navbar>
  )
}

export default ConstructorNavbar
