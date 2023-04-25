import { dehydrate } from "@blitzjs/rpc"
import db from "db"
import { gSSP } from "src/blitz-server"
import { CourseStepPageProps } from "./types"

export const getStepSSP = gSSP(async ({ params }) => {
  const id = params?.id as string
  const stepId = params?.stepId as string

  let step: CourseStepPageProps | null = null

  if (!isNaN(+id) && !isNaN(+stepId)) {
    step = await db.courseStep.findFirst({
      where: {
        id: +stepId,
        section: {
          courseId: +id,
        },
      },
      include: {
        contentText: true,
        contentVideo: true,
        section: {
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
            course: {
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
            },
          },
        },
      },
    })
  }

  if (!step) {
    return {
      notFound: true,
      props: {} as { [key: string]: any },
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      step,
    },
  }
})
