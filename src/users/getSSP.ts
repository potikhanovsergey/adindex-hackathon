import { dehydrate } from "@blitzjs/rpc"
import { User } from "@prisma/client"
import db from "db"
import { gSSP } from "src/blitz-server"

export const getUserSSP = gSSP(async ({ params }) => {
  const id = params?.id as string

  let user: User | null = null

  if (!isNaN(+id)) {
    user = await db.user.findFirst({ where: { id: +id } })
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
