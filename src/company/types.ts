import { Company, Event, Vacancy } from "@prisma/client"

export interface ExtendedCompany extends Company {
  vacancies: Vacancy[]
  events: Event[]
}
