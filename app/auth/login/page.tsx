"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Apple, ArrowRight, Fingerprint, Github, Mail } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ParticleBackground } from "@/components/particle-background"

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate login
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 1500)
  }

  const handleMagicLink = () => {
    if (!email) return
    setIsLoading(true)

    // Simulate sending magic link
    setTimeout(() => {
      setIsLoading(false)
      // Show success message
    }, 1500)
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
      <ParticleBackground />

      <div className="z-10 w-full max-w-md px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-border/40 bg-background/80 p-6 shadow-xl backdrop-blur-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 opacity-50" />

          <div className="relative">
            <div className="mb-6 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mx-auto mb-2 h-12 w-12 rounded-full bg-gradient-to-br from-primary to-secondary p-2"
              >
                <div className="flex h-full w-full items-center justify-center rounded-full bg-background text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 6v12" />
                    <path d="M8 10l4-4 4 4" />
                    <path d="M8 18l4 4 4-4" />
                    <path d="M18 12H6" />
                  </svg>
                </div>
              </motion.div>
              <h1 className="text-2xl font-bold tracking-tight">Welcome to WealthWave</h1>
              <p className="text-sm text-muted-foreground">Sign in to your account to continue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link href="/auth/reset-password" className="text-xs text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-background/50"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                    <span>Signing in...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Sign in</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </form>

            <div className="my-6 flex items-center">
              <Separator className="flex-1" />
              <span className="mx-2 text-xs text-muted-foreground">OR CONTINUE WITH</span>
              <Separator className="flex-1" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="bg-background/50">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
              <Button variant="outline" className="bg-background/50">
                <Apple className="mr-2 h-4 w-4" />
                Apple
              </Button>
            </div>

            <div className="mt-6 space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground"
                onClick={handleMagicLink}
                disabled={!email || isLoading}
              >
                <Mail className="mr-2 h-4 w-4" />
                Send magic link
              </Button>
              <Button variant="ghost" className="w-full justify-start text-muted-foreground">
                <Fingerprint className="mr-2 h-4 w-4" />
                Use biometric login
              </Button>
            </div>

            <div className="mt-6 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/register" className="font-medium text-primary hover:underline">
                Sign up
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

