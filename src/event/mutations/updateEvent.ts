import db, { Prisma } from "db"

export default async function updateEvent(input: Prisma.EventUpdateArgs) {
  return await db.event.update(input)
}
