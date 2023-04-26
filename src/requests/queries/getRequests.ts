import db, { Prisma } from "db"

export default async function getRequests(input: Prisma.UserVacancyRequestFindManyArgs) {
  return await db.userVacancyRequest.findMany(input)
}
