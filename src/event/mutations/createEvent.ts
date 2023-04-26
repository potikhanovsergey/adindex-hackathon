import db, { Prisma } from "db"

export default async function createEvent(input: Prisma.EventCreateArgs) {
  return await db.event.create(input)
}
