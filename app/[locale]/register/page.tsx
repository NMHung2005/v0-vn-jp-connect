"use client"

import { useState } from "react"
import { Link, useRouter } from "@/i18n/routing"
import { Eye, EyeOff, Check, ArrowLeft, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"
import { LanguageSwitcher } from "@/components/language-switcher"

const purposes = [
  "Language Exchange",
  "Making Friends",
  "Networking",
  "Finding Events",
]

const interests = [
  "Coffee Chat",
  "Sports",
  "Anime/Manga",
  "Food Exploring",
  "Travel",
  "Technology",
  "Music",
  "Photography",
  "Gaming",
  "Literature",
  "Cooking",
  "Movies",
]

const nationalities = [
  { value: "VN", labelKey: "VN" },
  { value: "JP", labelKey: "JP" },
  { value: "other", labelKey: "other" },
]

const japaneseLevel = [
  { value: "none", labelKey: "none" },
  { value: "n5", labelKey: "n5" },
  { value: "n4", labelKey: "n4" },
  { value: "n3", labelKey: "n3" },
  { value: "n2", labelKey: "n2" },
  { value: "n1", labelKey: "n1" },
  { value: "native", labelKey: "native" },
]

const vietnameseLevel = [
  { value: "none", labelKey: "none" },
  { value: "beginner", labelKey: "beginner" },
  { value: "elementary", labelKey: "elementary" },
  { value: "intermediate", labelKey: "intermediate" },
  { value: "advanced", labelKey: "advanced" },
  { value: "native", labelKey: "native" },
]

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const t = useTranslations("Register")
  const h = useTranslations("Header")
  const f = useTranslations("Footer")
  const l = useTranslations("Login")
  
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>(["Making Friends"])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Coffee Chat",
    "Food Exploring",
  ])
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    gender: "",
    birthDay: "",
    birthMonth: "",
    birthYear: "",
    nationality: "",
    city: "",
    district: "",
    japaneseLevel: "",
    vietnameseLevel: "",
    occupation: "",
    bio: "",
  })

  const togglePurpose = (purpose: string) => {
    setSelectedPurposes((prev) =>
      prev.includes(purpose)
        ? prev.filter((p) => p !== purpose)
        : [...prev, purpose]
    )
  }

  const toggleInterest = (interest: string) => {
    setSelectedInterests((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    )
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/home")
  }

  const days = Array.from({ length: 31 }, (_, i) => i + 1)
  const monthKeys = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ]
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 80 }, (_, i) => currentYear - 18 - i)

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">{l("back")}</span>
            </Link>
            <span className="text-xl font-semibold text-foreground tracking-tight">
              Connect VN-JP
            </span>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <span className="text-sm text-muted-foreground hidden sm:inline">{t("alreadyHaveAccount")}</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">{h("login")}</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-6 sm:p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-foreground">
              {t("title")}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {t("subtitle")}
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              {/* Section 01: Basic Information */}
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">01</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("section1")}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t("fullName")} <span className="text-destructive">*</span>
                    </label>
                    <Input 
                      placeholder={t("fullNamePlaceholder")} 
                      value={formData.fullName}
                      onChange={(e) => handleInputChange("fullName", e.target.value)}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {t("email")} <span className="text-destructive">*</span>
                      </label>
                      <Input 
                        placeholder="example@email.com" 
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {t("phone")}
                      </label>
                      <Input 
                        placeholder={t("placeholders.phone")} 
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t("password")} <span className="text-destructive">*</span>
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder={t("passwordPlaceholder")}
                        value={formData.password}
                        onChange={(e) => handleInputChange("password", e.target.value)}
                        required
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
                    <p className="text-xs text-muted-foreground">
                      {t("passwordHint")}
                    </p>
                  </div>
                </div>
              </div>

              {/* Section 02: Personal Details */}
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">02</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("section2")}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t("gender")} <span className="text-destructive">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Male", "Female", "Other", "Prefer not to say"].map((gender) => (
                        <button
                          key={gender}
                          type="button"
                          onClick={() => handleInputChange("gender", gender)}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                            formData.gender === gender
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-border hover:border-primary/50"
                          )}
                        >
                          {formData.gender === gender && (
                            <Check className="w-3.5 h-3.5 inline-block mr-1.5" />
                          )}
                          {t("genders." + gender)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t("dob")} <span className="text-destructive">*</span>
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="relative">
                        <select
                          value={formData.birthDay}
                          onChange={(e) => handleInputChange("birthDay", e.target.value)}
                          className="w-full h-10 px-3 pr-8 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        >
                          <option value="">{t("dates.day")}</option>
                          {days.map((day) => (
                            <option key={day} value={day}>{day}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                      <div className="relative">
                        <select
                          value={formData.birthMonth}
                          onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                          className="w-full h-10 px-3 pr-8 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        >
                          <option value="">{t("dates.month")}</option>
                          {monthKeys.map((month, idx) => (
                            <option key={month} value={idx + 1}>{t("dates.months." + month)}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                      <div className="relative">
                        <select
                          value={formData.birthYear}
                          onChange={(e) => handleInputChange("birthYear", e.target.value)}
                          className="w-full h-10 px-3 pr-8 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        >
                          <option value="">{t("dates.year")}</option>
                          {years.map((year) => (
                            <option key={year} value={year}>{year}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t("nationality")} <span className="text-destructive">*</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {nationalities.map((nat) => (
                        <button
                          key={nat.value}
                          type="button"
                          onClick={() => handleInputChange("nationality", nat.value)}
                          className={cn(
                            "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                            formData.nationality === nat.value
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-background text-foreground border-border hover:border-primary/50"
                          )}
                        >
                          {formData.nationality === nat.value && (
                            <Check className="w-3.5 h-3.5 inline-block mr-1.5" />
                          )}
                          {t("nationalities." + nat.labelKey)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      {t("occupation")}
                    </label>
                    <Input 
                      placeholder={t("placeholders.occupation")}
                      value={formData.occupation}
                      onChange={(e) => handleInputChange("occupation", e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Section 03: Location */}
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">03</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("section3")}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {t("city")} <span className="text-destructive">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          className="w-full h-10 px-3 pr-8 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                          required
                        >
                          <option value="">{t("selectCity")}</option>
                          <option value="hanoi">{t("cities.hanoi")}</option>
                          <option value="hcmc">{t("cities.hcmc")}</option>
                          <option value="danang">{t("cities.danang")}</option>
                          <option value="tokyo">{t("cities.tokyo")}</option>
                          <option value="osaka">{t("cities.osaka")}</option>
                          <option value="other">{t("cities.other")}</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {t("district")}
                      </label>
                      <Input 
                        placeholder={t("placeholders.district")}
                        value={formData.district}
                        onChange={(e) => handleInputChange("district", e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 04: Language Skills */}
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">04</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("section4")}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {t("japaneseLevel")}
                      </label>
                      <div className="relative">
                        <select
                          value={formData.japaneseLevel}
                          onChange={(e) => handleInputChange("japaneseLevel", e.target.value)}
                          className="w-full h-10 px-3 pr-8 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">{t("selectLevel")}</option>
                          {japaneseLevel.map((level) => (
                            <option key={level.value} value={level.value}>{t("levels." + level.labelKey)}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        {t("vietnameseLevel")}
                      </label>
                      <div className="relative">
                        <select
                          value={formData.vietnameseLevel}
                          onChange={(e) => handleInputChange("vietnameseLevel", e.target.value)}
                          className="w-full h-10 px-3 pr-8 rounded-md border border-input bg-background text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          <option value="">{t("selectLevel")}</option>
                          {vietnameseLevel.map((level) => (
                            <option key={level.value} value={level.value}>{t("levels." + level.labelKey)}</option>
                          ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 05: Your Purpose */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">05</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("section5")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {purposes.map((purpose) => (
                    <button
                      key={purpose}
                      type="button"
                      onClick={() => togglePurpose(purpose)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                        selectedPurposes.includes(purpose)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50"
                      )}
                    >
                      {selectedPurposes.includes(purpose) && (
                        <Check className="w-3.5 h-3.5 inline-block mr-1.5" />
                      )}
                      {t("purposes." + purpose)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 06: Your Interests */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">06</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("section6")}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium border transition-all",
                        selectedInterests.includes(interest)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:border-primary/50"
                      )}
                    >
                      {selectedInterests.includes(interest) && (
                        <Check className="w-3.5 h-3.5 inline-block mr-1.5" />
                      )}
                      {t("interests." + interest)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Section 07: About You */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">07</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {t("section7")}
                  </span>
                </div>

                <div className="space-y-2">
                  <Textarea 
                    placeholder={t("bioPlaceholder")}
                    className="min-h-[100px] resize-none"
                    value={formData.bio}
                    onChange={(e) => handleInputChange("bio", e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <Button type="submit" className="w-full" size="lg">
                  {t("completeButton")}
                </Button>

                <p className="text-center text-sm text-muted-foreground">
                  {t("alreadyHaveAccount")}{" "}
                  <Link
                    href="/login"
                    className="font-semibold text-foreground hover:text-primary transition-colors"
                  >
                    {l("loginButton")}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              {f("copyright")}
            </p>
            <div className="flex items-center gap-6">
              <Link href="/#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {f("privacyPolicy")}
              </Link>
              <Link href="/#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                {f("termsOfService")}
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
