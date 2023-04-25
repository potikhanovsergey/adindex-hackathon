import { BlitzPage } from "@blitzjs/next"
import { Container, Title } from "@mantine/core"
import ConstructorLayout from "src/core/layouts/ConstructorLayout"
import NewCourseForm from "src/course/components/Constructor/NewCourseForm"

const NewCoursePage: BlitzPage = () => {
  return (
    <ConstructorLayout>
      <Container>
        <Title mb="lg">Создание нового курса</Title>
        <NewCourseForm />
      </Container>
    </ConstructorLayout>
  )
}

export default NewCoursePage
