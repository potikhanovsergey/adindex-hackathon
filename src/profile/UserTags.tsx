import { Badge } from "@mantine/core"
import { useMemo } from "react"
import { ExtendedUser } from "src/users/types"

interface hashMapProps {
  name: string
  power: number
}

function getTotalPowers(user: ExtendedUser) {
  const result: hashMapProps[] = []
  const hashMap: hashMapProps | {} = {}

  user.enrollments.forEach((enrollment) => {
    enrollment.course.tags.forEach((tag) => {
      const name = tag.tag.name
      const power = tag.power
      if (!hashMap[name]) {
        hashMap[name] = { name, power }
      } else {
        hashMap[name].power += power
      }
    })
  })

  for (let name in hashMap) {
    result.push(hashMap[name])
  }

  return result
}

const UserTags = ({ user }: { user: ExtendedUser }) => {
  console.log(getTotalPowers(user))

  return (
    <>
      {getTotalPowers(user).map((power) => (
        <Badge key={power.name}>
          {power.name} {power.power}
        </Badge>
      ))}
    </>
  )
}

export default UserTags
