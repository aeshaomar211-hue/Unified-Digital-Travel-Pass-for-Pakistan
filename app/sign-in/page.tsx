import { redirect } from "next/navigation"
import { getSession } from "@/lib/session"
import { AuthForm } from "@/components/auth-form"

export const metadata = { title: "Sign In | SmartSafar" }

export default async function SignInPage() {
  const session = await getSession()
  if (session?.user) redirect("/dashboard")
  return <AuthForm mode="sign-in" />
}
