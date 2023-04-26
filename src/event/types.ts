import { Company, Event, EventTagLink, Tag } from "db"

export interface ExtendedEvent extends Event {
  company: Company
  tags: (EventTagLink & { tag: Tag })[]
}
export interface EventPageProps {
  event: ExtendedEvent
}
