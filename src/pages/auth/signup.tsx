import { useRouter } from "next/router"
import Layout from "src/core/layouts/Layout"
import { BlitzPage, Routes } from "@blitzjs/next"
import SignupForm from "src/auth/components/SignUpForm"

const SignupPage: BlitzPage = () => {
  const router = useRouter()

  return (
    <Layout title="Sign Up">
      <SignupForm />
    </Layout>
  )
}

SignupPage.redirectAuthenticatedTo = Routes.Home()

export default SignupPage
