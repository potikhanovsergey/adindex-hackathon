import signup from "src/auth/mutations/signup"
import { useMutation } from "@blitzjs/rpc"
import { Button, Container, Paper, PasswordInput, TextInput, Title, Text } from "@mantine/core"
import { useForm } from "@mantine/form"
import {
  validateEmail,
  validateFirstName,
  validateLastName,
  validatePassword,
  validatePatronymic,
} from "src/users/utils"
import Link from "src/core/Link"
import { Routes } from "@blitzjs/next"

const SignupForm = () => {
  const form = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      patronymic: "",
      email: "",
      password: "",
    },

    validate: {
      email: validateEmail,
      firstName: validateFirstName,
      lastName: validateLastName,
      patronymic: validatePatronymic,
      password: validatePassword,
    },
  })

  const [signupMutation] = useMutation(signup)

  const handleSubmit = form.onSubmit(async (values) => {
    try {
      const response = await signupMutation({
        firstName: values.firstName,
        lastName: values.lastName,
        patronymic: values.patronymic,
        email: values.email,
        password: values.password,
      })
    } catch (err) {
      console.log("ERROR", err)
    }
  })

  return (
    <Container size={420} mt={40}>
      <Title align="center">Создать аккаунт</Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Уже есть аккаунт? <Link href={Routes.SignupPage()}>Войти</Link>
      </Text>
      <form onSubmit={handleSubmit}>
        <Paper p={30} mt={30}>
          <TextInput label="Имя" {...form.getInputProps("firstName")} required />
          <TextInput label="Фамилия" {...form.getInputProps("lastName")} required />
          <TextInput label="Отчество" {...form.getInputProps("patronymic")} />
          <TextInput label="Почта" {...form.getInputProps("email")} required />
          <PasswordInput label="Пароль" {...form.getInputProps("password")} required />
          <Button fullWidth mt="xl" type="submit">
            Зарегистрироваться
          </Button>
        </Paper>
      </form>
    </Container>
  )
}

export default SignupForm
