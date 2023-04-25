import { BlitzPage } from "@blitzjs/next"
import { Container, useMantineTheme, Box, rem } from "@mantine/core"
import { GetServerSideProps } from "next"
import { Suspense } from "react"
import Layout from "src/core/layouts/Layout"
import CourseInfo from "src/course/components/CourseInfo"
import CourseInfoCard from "src/course/components/CourseInfoCard"
import { getCourseSSP } from "src/course/getSSP"
import { ExtendedCourse } from "src/course/types"

export interface CoursePageProps {
  course: ExtendedCourse
}

const CoursePage: BlitzPage<CoursePageProps> = ({ course }) => {
  const theme = useMantineTheme()

  return (
    <Layout>
      <Container>
        <Box sx={{ display: "grid", gridTemplateColumns: "9fr 3fr", gap: rem(128) }}>
          <div>
            <CourseInfo course={course} />
          </div>
          <Suspense>
            <CourseInfoCard course={course} />
          </Suspense>
        </Box>
      </Container>
    </Layout>
  )
}

export default CoursePage

export const getServerSideProps: GetServerSideProps = getCourseSSP
