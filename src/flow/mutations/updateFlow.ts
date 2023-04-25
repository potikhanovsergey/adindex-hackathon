import db, { Prisma } from "db"

export default async function updateFlow(input: Prisma.FlowUpdateArgs) {
  return await db.flow.update(input)
}
