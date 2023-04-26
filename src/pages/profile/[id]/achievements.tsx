import { BlitzPage } from "@blitzjs/auth"
import { Paper, SimpleGrid, Image, Text } from "@mantine/core"
import ProfileLayout from "src/core/layouts/ProfileLayout"

export const achivementsMock = [
  {
    label: "За 100 баллов в маркетинге",
    image: "https://cdn-icons-png.flaticon.com/512/1378/1378582.png",
  },
  {
    label: "За 200 баллов в маркетинге",
    image: "https://cdn-icons-png.flaticon.com/512/5474/5474094.png",
  },
  {
    label: "За 100 баллов в разработке",
    image:
      "https://t3.ftcdn.net/jpg/05/21/48/30/360_F_521483071_AbfL2ihu8ylCzi9i1XCddMiRJTQiB4YT.jpg",
  },
]

const AchivementsPage: BlitzPage = () => {
  return (
    <ProfileLayout>
      <SimpleGrid cols={5}>
        {achivementsMock.map((achivement) => (
          <Paper key={achivement.image} p="sm">
            <Image src={achivement.image} alt="achivement picture" mb="sm" />
            <Text sx={{ textAlign: "center" }}>{achivement.label}</Text>
          </Paper>
        ))}
      </SimpleGrid>
    </ProfileLayout>
  )
}

export default AchivementsPage
