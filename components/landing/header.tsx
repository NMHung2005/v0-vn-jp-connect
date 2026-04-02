"use client"

import { Link } from "@/i18n/routing"
import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/language-switcher"

export function Header() {
  const t = useTranslations("Header")

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-semibold text-foreground tracking-tight">
              Connect VN-JP
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <LanguageSwitcher />
            <Button variant="ghost" size="sm" asChild>
              <Link href="/login">{t("login")}</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/register">{t("register")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
