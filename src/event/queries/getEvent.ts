import db, { Prisma } from "db"

export default async function getEvent(input: Prisma.EventFindFirstArgs) {
  return await db.event.findFirst(input)
}
