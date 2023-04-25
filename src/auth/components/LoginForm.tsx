import { PromiseReturnType } from "blitz"
import Link from "next/link"
import login from "src/auth/mutations/login"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useForm } from "@mantine/form"
import { Button, Container, Paper, PasswordInput, TextInput, Title, Text } from "@mantine/core"

type LoginFormProps = {
  onSuccess?: (user: PromiseReturnType<typeof login>) => void
}

export const LoginForm = (props: LoginFormProps) => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
    },
  })

  const [loginMutation] = useMutation(login)

  const handleSubmit = form.onSubmit((values) => {
    try {
      void loginMutation({ email: values.email, password: values.password })
    } catch (err) {
      if (err?.statusCode === 401) {
        form.setFieldError("email", "Почта или логин не верны, попробуйте снова")
      }
    }
  })

  return (
    <div>
      <Container size={420} mt={40}>
        <Title align="center">Добро пожаловать!</Title>
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Еще нет аккаунта? <Link href={Routes.SignupPage()}>Создать</Link>
        </Text>

        <form onSubmit={handleSubmit}>
          <Paper withBorder shadow="md" p={30} mt={30} radius="md">
            <TextInput label="Почта" {...form.getInputProps("email")} required />
            <PasswordInput label="Пароль" {...form.getInputProps("password")} required />
            <Button fullWidth mt="xl" type="submit">
              Войти в аккаунт
            </Button>
          </Paper>
        </form>
      </Container>
    </div>
  )
}

export default LoginForm
