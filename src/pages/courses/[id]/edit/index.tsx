import { BlitzPage, Routes } from "@blitzjs/next"
import { Container, Title, Box, Center, SegmentedControl } from "@mantine/core"
import { GetServerSideProps } from "next"
import ConstructorLayout from "src/core/layouts/ConstructorLayout"
import { getCourseSSP } from "src/course/getSSP"
import { CoursePageProps } from ".."
import EditCourseForm from "src/course/components/Constructor/EditCourseForm"
import { IconInfoSquareFilled, IconBooks } from "@tabler/icons-react"
import { useState } from "react"
import Link from "src/core/Link"
import CourseContents from "src/course/components/Constructor/CourseContents"

const EditCoursePage: BlitzPage<CoursePageProps> = ({ course }) => {
  const [activeTab, setActiveTab] = useState("description")

  return (
    <ConstructorLayout>
      <Container>
        <Title size="h2" mb="lg">
          Редактирование курса{" "}
          <Link span href={Routes.CoursePage({ id: course.id })} target="_blank" size="xl">
            {course.name}
          </Link>
        </Title>

        <SegmentedControl
          value={activeTab}
          onChange={setActiveTab}
          mb="md"
          data={[
            {
              value: "description",
              label: (
                <Center>
                  <IconInfoSquareFilled size="1rem" />
                  <Box ml={10}>Описание</Box>
                </Center>
              ),
            },
            {
              value: "contents",
              label: (
                <Center>
                  <IconBooks size="1rem" />
                  <Box ml={10}>Содержание</Box>
                </Center>
              ),
            },
          ]}
        />

        <Box display={activeTab === "description" ? "block" : "none"}>
          <EditCourseForm course={course} />
        </Box>

        <Box display={activeTab === "contents" ? "block" : "none"}>
          <CourseContents course={course} />
        </Box>
      </Container>
    </ConstructorLayout>
  )
}

export default EditCoursePage

export const getServerSideProps: GetServerSideProps = getCourseSSP
