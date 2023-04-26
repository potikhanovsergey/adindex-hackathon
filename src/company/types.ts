import { Company, Event, Vacancy } from "@prisma/client"
import { ExtendedEvent } from "src/event/types"

export interface ExtendedCompany extends Company {
  vacancies: Vacancy[]
  events: ExtendedEvent[]
}
