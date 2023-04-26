import { BlitzPage } from "@blitzjs/next"
import { Box, ScrollArea } from "@mantine/core"
import { GetServerSideProps } from "next"
import YouTube from "react-youtube"
import CourseLayout from "src/core/layouts/CourseLayout"
import { getStepSSP } from "src/course/getStepSSP"
import { CourseStepPageProps } from "src/course/types"

export interface CourseStepPageInterface {
  step: CourseStepPageProps
}

const CourseLearn: BlitzPage<CourseStepPageInterface> = ({ step }) => {
  const opts = {
    width: "100%",
    height: "100%",
  }

  return (
    <CourseLayout step={step}>
      {step.type === "text" ? (
        <ScrollArea.Autosize>
          <Box h="65vh">
            <div dangerouslySetInnerHTML={{ __html: step.contentText?.text || "" }} />
          </Box>
        </ScrollArea.Autosize>
      ) : step.type == "video" ? (
        <YouTube videoId={step.contentVideo?.url} opts={opts} style={{ aspectRatio: "16/9" }} />
      ) : (
        <></>
      )}
    </CourseLayout>
  )
}

export default CourseLearn

export const getServerSideProps: GetServerSideProps = getStepSSP
