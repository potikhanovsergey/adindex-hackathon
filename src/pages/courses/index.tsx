import { BlitzPage } from "@blitzjs/auth"
import Layout from "src/core/layouts/Layout"
import { SimpleGrid, Title } from "@mantine/core"
import { useQuery } from "@blitzjs/rpc"
import getCourses from "src/course/queries/getCourses"
import CourseCard from "src/course/components/CourseCard"
import { Suspense } from "react"

const Courses = () => {
  const [courses] = useQuery(getCourses, {})

  return (
    <SimpleGrid cols={4} spacing={40}>
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </SimpleGrid>
  )
}

const CoursesPage: BlitzPage = () => {
  return (
    <Layout>
      <Title mb={48}>Все курсы</Title>
      <Suspense>
        <Courses />
      </Suspense>
    </Layout>
  )
}

export default CoursesPage
