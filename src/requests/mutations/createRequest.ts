import db, { Prisma } from "db"

export default async function createRequest(input: Prisma.UserVacancyRequestCreateArgs) {
  return await db.userVacancyRequest.create(input)
}
