import { dehydrate } from "@blitzjs/rpc"
import { Company } from "@prisma/client"
import db from "db"
import { gSSP } from "src/blitz-server"
import { ExtendedCompany } from "./types"

export const getCompanySSP = gSSP(async ({ params }) => {
  const id = params?.id as string

  let company: ExtendedCompany | null = null

  if (!isNaN(+id)) {
    company = await db.company.findFirst({
      where: { id: +id },
      include: {
        vacancies: true,
        events: { include: { tags: { include: { tag: true } }, company: true } },
      },
    })
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
