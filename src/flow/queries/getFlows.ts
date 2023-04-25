import db, { Prisma } from "db"

export default async function getFlows(input: Prisma.FlowFindManyArgs) {
  return await db.flow.findMany(input)
}
