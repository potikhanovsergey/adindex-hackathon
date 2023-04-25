import db, { Prisma } from "db"

export default async function getFlow(input: Prisma.FlowFindFirstArgs) {
  return await db.flow.findFirst(input)
}
