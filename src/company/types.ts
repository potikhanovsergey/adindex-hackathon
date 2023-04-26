import { Company, Vacancy } from "@prisma/client"

export interface ExtendedCompany extends Company {
  vacancies: Vacancy[]
}
