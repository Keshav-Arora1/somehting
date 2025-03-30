import { redirect } from "next/navigation"

export default function Home() {
  // In a real app, check authentication status here
  const isAuthenticated = false

  if (!isAuthenticated) {
    redirect("/auth/login")
  }

  return redirect("/dashboard")
}

