import { dehydrate } from "@blitzjs/rpc"
import db from "db"
import { gSSP } from "src/blitz-server"
import { ExtendedCourse } from "./types"

export const getCourseSSP = gSSP(async ({ params }) => {
  const id = params?.id as string
  let course: ExtendedCourse | null = null

  if (!isNaN(+id)) {
    course = await db.course.findFirst({
      where: {
        id: +id,
      },
      include: {
        sections: {
          orderBy: {
            index: "asc",
          },
          include: {
            steps: {
              orderBy: {
                index: "asc",
              },
              include: {
                contentText: true,
                contentVideo: true,
              },
            },
          },
        },
      },
    })
  }

  if (!course) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      course,
    },
  }
})
