import db, { Prisma } from "db"

export default async function getEvents(input: Prisma.EventFindManyArgs) {
  return await db.event.findMany(input)
}
