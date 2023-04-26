import { dehydrate } from "@blitzjs/rpc"
import db from "db"
import { gSSP } from "src/blitz-server"
import { ExtendedFlow } from "src/flow/types"

export const getFlowSSP = gSSP(async ({ params }) => {
  const id = params?.id as string
  let flow: ExtendedFlow | null = null

  if (!isNaN(+id)) {
    flow = await db.flow.findFirst({
      where: {
        id: +id,
      },
      include: {
        nodes: {
          include: {
            course: true,
          },
        },
        edges: true,
      },
    })
  }

  if (!flow) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      flow,
    },
  }
})
