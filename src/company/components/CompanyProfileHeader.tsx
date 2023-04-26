import { Group, Stack, Image, Text, Grid, Title } from "@mantine/core"
import { Company } from "@prisma/client"
import { Suspense } from "react"
import CompanyVacancies from "./CompanyVacancies"

const CompanyProfileHeader = ({ company }: { company: Company }) => {
  return (
    <>
      <Grid align="center">
        <Grid.Col span={3}>
          <Image
            src="https://matchboxbootcamp.com/assets/frontend/images/courseplaceholder.png"
            alt="company logo"
          />
        </Grid.Col>
        <Grid.Col span={9}>
          <Stack p="sm" spacing={0}>
            <Title size={24} order={1}>
              {company.name}
            </Title>
            {company.websiteUrl && <Text>Сайт: {company.websiteUrl}</Text>}
            {company.email && <Text>Почта: {company.email}</Text>}
            {company.phoneNumber && <Text>Номер телефона: {company.phoneNumber}</Text>}
            {company.telegramId && <Text>Телеграм: {company.telegramId}</Text>}
          </Stack>
        </Grid.Col>
      </Grid>
    </>
  )
}

export default CompanyProfileHeader
