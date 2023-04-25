import db, { Prisma } from "db"

export default async function createFlow(input: Prisma.FlowCreateArgs) {
  return await db.flow.create(input)
}
