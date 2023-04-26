import { dehydrate } from "@blitzjs/rpc"
import { gSSP } from "src/blitz-server"
import { ExtendedEvent } from "./types"
import getEvent from "./queries/getEvent"

export const getEventSSP = gSSP(async ({ params }) => {
  const id = params?.id as string
  let event: ExtendedEvent | null = null

  if (!isNaN(+id)) {
    event = await getEvent({ where: { id: +id } })
  }

  if (!event) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      event,
    },
  }
})
