import { Paper, Stack, Button, Image, Text, AspectRatio } from "@mantine/core"
import { Event } from "@prisma/client"
import dayjs from "dayjs"
import { supabase } from "lib/supabase"
import { useRouter } from "next/router"

const EventCard = ({ event }: { event: Event }) => {
  const router = useRouter()

  return (
    <Paper p={0} display="flex" sx={{ flexDirection: "column" }}>
      <AspectRatio ratio={16 / 9}>
        <Image
          fit="cover"
          src={
            event.previewImageUrl
              ? supabase.storage.from("images").getPublicUrl(event.previewImageUrl).data.publicUrl
              : "https://matchboxbootcamp.com/assets/frontend/images/courseplaceholder.png"
          }
          alt="course preview"
        />
      </AspectRatio>

      <Stack p="sm" spacing={0}>
        <Text weight="bold" mb="sm">
          {event.name}
        </Text>
        <Text>
          {dayjs(event.startDate).format("DD/MM/YYYY")} -{" "}
          {dayjs(event.endDate).format("DD/MM/YYYY")}
        </Text>
      </Stack>
      <Button mt="auto" mx="sm" mb="sm">
        Подробнее
      </Button>
    </Paper>
  )
}

export default EventCard
