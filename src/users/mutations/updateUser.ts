import db, { Prisma } from "db"

export default async function updateUser(input: Prisma.UserUpdateArgs) {
  const user = await db.user.update(input)
  return user
}
