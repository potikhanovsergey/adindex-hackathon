import db, { Prisma } from "db"

export default async function createVacancy(input: Prisma.VacancyCreateArgs) {
  return await db.vacancy.create(input)
}
