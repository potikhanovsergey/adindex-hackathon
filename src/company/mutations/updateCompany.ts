import db, { Prisma } from "db"

export default async function updateCompany(input: Prisma.CompanyUpdateArgs) {
  return await db.company.update(input)
}
