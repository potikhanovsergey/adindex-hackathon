import { Ctx } from "blitz"
import db, { Prisma } from "db"

export default async function getUsers(input: Prisma.UserFindManyArgs, { session }: Ctx) {
  if (!session.userId) return null

  const users = await db.user.findMany(input)

  return users
}
