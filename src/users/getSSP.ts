import { dehydrate } from "@blitzjs/rpc"
import { User } from "@prisma/client"
import db from "db"
import { gSSP } from "src/blitz-server"
import { ExtendedUser } from "./types"

export const getUserSSP = gSSP(async ({ params }) => {
  const id = params?.id as string

  let user: ExtendedUser | null = null

  if (!isNaN(+id)) {
    user = await db.user.findFirst({
      where: { id: +id },
      include: {
        company: true,
        enrollments: { include: { course: { include: { tags: { include: { tag: true } } } } } },
      },
    })
  }

  if (!user) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      user,
    },
  }
})
