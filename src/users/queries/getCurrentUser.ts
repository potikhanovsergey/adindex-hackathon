import { Ctx } from "blitz"
import db from "db"

const getCurrentUser = async (_ = null, { session }: Ctx) => {
  if (!session.userId) return null

  const user = await db.user.findFirst({
    where: { id: session.userId },
    select: {
      id: true,
      firstName: true,
      avatarUrl: true,
      lastName: true,
      patronymic: true,
      email: true,
      role: true,
      enrollments: true,
      companyId: true,
      company: true,
      requests: true,
    },
  })

  return user
}

export type UserProps = Awaited<ReturnType<typeof getCurrentUser>>
export default getCurrentUser
