import { Routes } from "@blitzjs/next"
import { createStyles, Title, Text, Button, Container, Group, rem } from "@mantine/core"
import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"

const useStyles = createStyles((theme) => ({
  root: {
    paddingTop: rem(20),
  },

  label: {
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(180),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2],

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(120),
    },
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 900,
    fontSize: rem(38),

    [theme.fn.smallerThan("sm")]: {
      fontSize: rem(32),
    },
  },

  description: {
    maxWidth: rem(500),
    margin: "auto",
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
  },
}))

export default function Page404() {
  const { classes } = useStyles()
  const router = useRouter()

  return (
    <Layout>
      <Container className={classes.root}>
        <div className={classes.label}>404</div>
        <Title className={classes.title}>Найдено секретное место.</Title>
        <Text color="dimmed" size="lg" align="center" className={classes.description}>
          К сожалению, это просто страница 404. Возможно вы опечатались в адресной строке, или
          страница переехала на другой адрес.
        </Text>
        <Group position="center">
          <Button variant="subtle" size="md" onClick={() => router.push(Routes.Home())}>
            На главную страницу
          </Button>
        </Group>
      </Container>
    </Layout>
  )
}
