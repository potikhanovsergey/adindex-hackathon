import { SecurePassword } from "@blitzjs/auth/secure-password"
import { resolver } from "@blitzjs/rpc"
import db, { User } from "db"
import { Role } from "types"

type Input = Pick<User, "email" | "firstName" | "lastName" | "patronymic"> & { password: string }

export default resolver.pipe(
  async ({ email, password, firstName, lastName, patronymic }: Input, ctx) => {
    const hashedPassword = await SecurePassword.hash(password.trim())
    const user = await db.user.create({
      data: {
        email: email.toLowerCase().trim(),
        hashedPassword,
        role: "USER",
        firstName,
        lastName,
        patronymic,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        patronymic: true,
        email: true,
        role: true,
      },
    })

    await ctx.session.$create({ userId: user.id, role: user.role as Role })
    return user
  }
)
