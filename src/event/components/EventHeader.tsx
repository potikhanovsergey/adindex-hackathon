import { Grid, Stack, Title, Image, Text, AspectRatio, Button, Badge, Group } from "@mantine/core"
import dayjs from "dayjs"
import { supabase } from "lib/supabase"
import { ExtendedEvent } from "../types"

const EventHeader = ({ event }: { event: ExtendedEvent }) => {
  return (
    <Grid align="center" mb="md">
      <Grid.Col span={4}>
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
      </Grid.Col>
      <Grid.Col span={8}>
        <Stack p="sm" spacing={0} align="flex-start">
          <Group noWrap>
            <Title size={24} order={1} mb="xs">
              {event.name}
            </Title>

            {event.tags.map((tag) => (
              <Badge key={tag.tagId}>
                {tag.tag.name} {tag.power}
              </Badge>
            ))}
          </Group>

          <Text size="xl">
            {dayjs(event.startDate).format("DD/MM/YYYY")} -{" "}
            {dayjs(event.endDate).format("DD/MM/YYYY")}
          </Text>
          <Text mb="sm">{event.company.name}</Text>
          <Button>Участовать</Button>
        </Stack>
      </Grid.Col>
    </Grid>
  )
}

export default EventHeader
