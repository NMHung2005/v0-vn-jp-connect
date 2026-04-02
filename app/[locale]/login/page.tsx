"use client"

import { useState } from "react"
import { Link, useRouter } from "@/i18n/routing"
import { Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const t = useTranslations("Login")
  const h = useTranslations("Header")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent/50 via-background to-accent/30 flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{t("back")}</span>
            </Link>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <span className="text-sm text-muted-foreground">{t("newHere")}</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/register">{h("register")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-lg">
            <div className="text-center mb-8">
              <span className="text-sm font-medium text-primary">
                VN-JP Connect
              </span>
              <h1 className="mt-2 text-2xl font-bold text-foreground">
                {t("welcomeBack")}
              </h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("emailOrPhone")}
                </label>
                <Input placeholder="name@example.com" type="email" />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {t("password")}
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("passwordPlaceholder")}
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
                {t("loginButton")}
              </Button>

              <div className="text-center">
                <Link
                  href="#"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t("forgotPassword")}
                </Link>
              </div>

              <div className="border-t border-border pt-5">
                <p className="text-center text-sm text-muted-foreground">
                  {t("dontHaveAccount")}{" "}
                  <Link
                    href="/register"
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {t("register")}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="py-6">
        <p className="text-center text-sm text-muted-foreground">
          {t("copyright")}
        </p>
      </footer>
    </div>
  )
}
