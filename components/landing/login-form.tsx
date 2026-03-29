"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <section id="login" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
          <div className="text-center mb-8">
            <span className="text-sm font-medium text-primary">
              VN-JP Connect
            </span>
            <h2 className="mt-2 text-2xl font-bold text-foreground">
              Welcome Back
            </h2>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Email or Phone Number
              </label>
              <Input placeholder="name@example.com" type="email" />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg">
              Log in
            </Button>

            <div className="text-center">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Forgot your password?
              </a>
            </div>

            <div className="border-t border-border pt-5">
              <p className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <a
                  href="#register"
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
