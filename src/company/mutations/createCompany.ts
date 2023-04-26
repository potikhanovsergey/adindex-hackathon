import db, { Prisma } from "db"

export default async function createCompany(input: Prisma.CompanyCreateArgs) {
  return await db.company.create(input)
}
