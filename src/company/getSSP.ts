import { dehydrate } from "@blitzjs/rpc"
import { Company } from "@prisma/client"
import db from "db"
import { gSSP } from "src/blitz-server"

export const getCompanySSP = gSSP(async ({ params }) => {
  const id = params?.id as string

  let company: Company | null = null

  if (!isNaN(+id)) {
    company = await db.company.findFirst({ where: { id: +id } })
  }

  if (!company) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      company,
    },
  }
})
