"use client"

import { useState } from "react"
import { Link, useRouter } from "@/i18n/routing"
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Mail, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [showResetDialog, setShowResetDialog] = useState(false)
  const [resetStep, setResetStep] = useState<"email" | "otp" | "password" | "success">("email")
  const [resetEmail, setResetEmail] = useState("")
  const [otpInput, setOtpInput] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [resetError, setResetError] = useState("")
  const t = useTranslations("Login")
  const h = useTranslations("Header")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/home")
  }

  const openResetDialog = () => {
    setResetStep("email")
    setResetEmail("")
    setOtpInput("")
    setNewPassword("")
    setConfirmPassword("")
    setResetError("")
    setShowResetDialog(true)
  }

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault()

    if (!resetEmail.trim()) {
      setResetError(t("resetEmailRequired"))
      return
    }

    setResetError("")
    setResetStep("otp")
  }

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault()

    if (otpInput.trim() !== "123456") {
      setResetError(t("otpInvalid"))
      return
    }

    setResetError("")
    setResetStep("password")
  }

  const handleResetPassword = (e: React.FormEvent) => {
    e.preventDefault()

    if (!newPassword || newPassword.length < 8) {
      setResetError(t("passwordTooShort"))
      return
    }

    if (newPassword !== confirmPassword) {
      setResetError(t("passwordMismatch"))
      return
    }

    setResetError("")
    setResetStep("success")
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
                  onClick={(event) => {
                    event.preventDefault()
                    openResetDialog()
                  }}
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

      <Dialog open={showResetDialog} onOpenChange={setShowResetDialog}>
        <DialogContent className="sm:max-w-lg">
          {resetStep !== "success" ? (
            <>
              <DialogHeader>
                <DialogTitle>{t("resetPasswordTitle")}</DialogTitle>
                <DialogDescription>{t("resetPasswordDescription")}</DialogDescription>
              </DialogHeader>

              <div className="flex items-center gap-2 rounded-xl border border-border bg-muted/40 px-3 py-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4 text-primary" />
                <span>{t("otpDemoNotice")}</span>
              </div>

              {resetError && (
                <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {resetError}
                </div>
              )}

              {resetStep === "email" && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t("resetEmailLabel")}
                    </label>
                    <div className="relative">
                      <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <Input
                        value={resetEmail}
                        onChange={(event) => setResetEmail(event.target.value)}
                        type="email"
                        placeholder="name@example.com"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setShowResetDialog(false)}>
                      {t("cancel")}
                    </Button>
                    <Button type="submit">{t("sendOtp")}</Button>
                  </DialogFooter>
                </form>
              )}

              {resetStep === "otp" && (
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t("otpLabel")}
                    </label>
                    <Input
                      value={otpInput}
                      onChange={(event) => setOtpInput(event.target.value)}
                      inputMode="numeric"
                      placeholder="123456"
                      maxLength={6}
                    />
                    <p className="text-xs text-muted-foreground">{t("otpHint")}</p>
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setResetStep("email")}>
                      {t("back")}
                    </Button>
                    <Button type="submit">{t("verifyOtp")}</Button>
                  </DialogFooter>
                </form>
              )}

              {resetStep === "password" && (
                <form onSubmit={handleResetPassword} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t("newPasswordLabel")}
                    </label>
                    <Input
                      value={newPassword}
                      onChange={(event) => setNewPassword(event.target.value)}
                      type="password"
                      placeholder={t("newPasswordPlaceholder")}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                      {t("confirmPasswordLabel")}
                    </label>
                    <Input
                      value={confirmPassword}
                      onChange={(event) => setConfirmPassword(event.target.value)}
                      type="password"
                      placeholder={t("confirmPasswordPlaceholder")}
                    />
                  </div>

                  <DialogFooter>
                    <Button type="button" variant="outline" onClick={() => setResetStep("otp")}>
                      {t("back")}
                    </Button>
                    <Button type="submit">{t("resetPassword")}</Button>
                  </DialogFooter>
                </form>
              )}
            </>
          ) : (
            <div className="space-y-6 text-center py-2">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <div className="space-y-2">
                <DialogTitle className="text-2xl">{t("resetSuccessTitle")}</DialogTitle>
                <DialogDescription>{t("resetSuccessDescription")}</DialogDescription>
              </div>
              <Button
                className="w-full"
                onClick={() => {
                  setShowResetDialog(false)
                  setResetStep("email")
                }}
              >
                {t("backToLogin")}
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
