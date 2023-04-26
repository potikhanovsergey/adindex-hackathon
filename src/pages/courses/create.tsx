import { BlitzPage } from "@blitzjs/next"
import { Container, Title } from "@mantine/core"
import ConstructorLayout from "src/core/layouts/ConstructorLayout"
import CreateCourseForm from "src/course/components/Constructor/CreateCourseForm"

const NewCoursePage: BlitzPage = () => {
  return (
    <ConstructorLayout>
      <Container>
        <Title mb="lg">Создание нового курса</Title>
        <CreateCourseForm />
      </Container>
    </ConstructorLayout>
  )
}

export default NewCoursePage
