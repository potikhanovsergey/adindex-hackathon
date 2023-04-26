import { Paper, Image, Stack, Text } from "@mantine/core"
import { Company } from "@prisma/client"

const CompanyCard = ({ company }: { company: Company }) => {
  return (
    <Paper>
      <Image
        src="https://matchboxbootcamp.com/assets/frontend/images/courseplaceholder.png"
        alt="company logo"
      />
      <Stack p="sm" spacing={0}>
        <Text weight="bold" size="xl">
          {company.name}
        </Text>
        <div dangerouslySetInnerHTML={{ __html: company.description || "" }} />
        {company.websiteUrl && <Text>Сайт: {company.websiteUrl}</Text>}
        {company.email && <Text>Почта: {company.email}</Text>}
        {company.phoneNumber && <Text>Номер телефона: {company.phoneNumber}</Text>}
        {company.telegramId && <Text>Телеграм: {company.telegramId}</Text>}
      </Stack>
    </Paper>
  )
}

export default CompanyCard
