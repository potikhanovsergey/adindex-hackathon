import { SegmentedControl, Tabs } from "@mantine/core"
import { useState } from "react"
import CourseCommentsTab from "./Tabs/CourseCommentsTab"
import CourseDescriptionTab from "./Tabs/CourseDescriptionTab"
import CourseResourcesTab from "./Tabs/CourseResourcesTab"

const CourseTabs = () => {
  const [chosenTab, setChosenTab] = useState("description")

  return (
    <>
      <SegmentedControl
        mb="md"
        w="fit-content"
        value={chosenTab}
        onChange={setChosenTab}
        data={[
          { label: "Описание задачи", value: "description" },
          { label: "Комментарии", value: "comments" },
          { label: "Дополнительные материалы", value: "resources" },
        ]}
      />
      {chosenTab === "description" ? (
        <CourseDescriptionTab />
      ) : chosenTab === "comments" ? (
        <CourseCommentsTab />
      ) : chosenTab === "resources" ? (
        <CourseResourcesTab />
      ) : (
        <></>
      )}
    </>
  )
}

export default CourseTabs
