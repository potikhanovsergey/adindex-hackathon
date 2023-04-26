import { BlitzPage } from "@blitzjs/next"
import { Container, Loader, Title } from "@mantine/core"
import { Suspense } from "react"
import ConstructorLayout from "src/core/layouts/ConstructorLayout"
import CreateCourseForm from "src/course/components/Constructor/CreateCourseForm"

const NewCoursePage: BlitzPage = () => {
  return (
    <ConstructorLayout>
      <Container>
        <Title mb="lg">Создание нового курса</Title>
        <Suspense fallback={<Loader />}>
          <CreateCourseForm />
        </Suspense>
      </Container>
    </ConstructorLayout>
  )
}

export default NewCoursePage
