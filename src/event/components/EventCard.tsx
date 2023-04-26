import { Paper, Stack, Button, Image, Text, AspectRatio, Group, Badge } from "@mantine/core"
import dayjs from "dayjs"
import { supabase } from "lib/supabase"
import { useRouter } from "next/router"
import { ExtendedEvent } from "../types"
import Link from "next/link"
import { Routes } from "@blitzjs/next"

const EventCard = ({ event }: { event: ExtendedEvent }) => {
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
        <Group mb="sm">
          <Text weight="bold">{event.name}</Text>

          {event.tags.map((tag) => (
            <Badge key={tag.tagId}>
              {tag.tag.name} {tag.power}
            </Badge>
          ))}
        </Group>

        <Text>
          {dayjs(event.startDate).format("DD/MM/YYYY")} -{" "}
          {dayjs(event.endDate).format("DD/MM/YYYY")}
        </Text>
      </Stack>
      <Button component={Link} href={Routes.EventPage({ id: event.id })} mt="auto" mx="sm" mb="sm">
        Подробнее
      </Button>
    </Paper>
  )
}

export default EventCard
