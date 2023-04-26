import { useQuery } from "@blitzjs/rpc"
import { Stack } from "@mantine/core"
import { User, UserVacancyRequest, Vacancy } from "@prisma/client"
import RequestCard from "src/requests/components/RequestCard"
import getRequests from "src/requests/queries/getRequests"
import { ExtendedCompany } from "../types"

export interface ExtendedRequest extends UserVacancyRequest {
  vacancy: Vacancy
  user: User
}

const CompanyRequests = ({ company }: { company: ExtendedCompany }) => {
  const [requests] = useQuery(getRequests, {
    where: {
      vacancy: {
        companyId: {
          equals: company.id,
        },
      },
    },
    include: {
      vacancy: true,
      user: true,
    },
  })

  return (
    <Stack>
      {requests.map((request) => (
        <RequestCard key={request.id} request={request as ExtendedRequest} />
      ))}
    </Stack>
  )
}

export default CompanyRequests
