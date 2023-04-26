import { Event } from "db"

export interface ExtendedEvent extends Event {}
export interface EventPageProps {
  event: ExtendedEvent
}
