import { dehydrate } from "@blitzjs/rpc"
import db from "db"
import { gSSP } from "src/blitz-server"
import { ExtendedVacancy } from "./components/VacancyCard"

export const getVacancySSP = gSSP(async ({ params }) => {
  const id = params?.id as string

  let vacancy: ExtendedVacancy | null = null

  if (!isNaN(+id)) {
    vacancy = await db.vacancy.findFirst({
      where: { id: +id },
      include: {
        company: true,
      },
    })
  }

  if (!vacancy) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      vacancy,
    },
  }
})
