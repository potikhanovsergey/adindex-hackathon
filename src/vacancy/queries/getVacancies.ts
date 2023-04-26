import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getVacancies(input: Prisma.VacancyFindManyArgs) {
  const vacancies = await db.vacancy.findMany(input)

  return vacancies
}
