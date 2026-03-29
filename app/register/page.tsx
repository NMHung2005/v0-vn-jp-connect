"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

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
]

export default function RegisterPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [selectedPurposes, setSelectedPurposes] = useState<string[]>(["Making Friends"])
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "Coffee Chat",
    "Food Exploring",
  ])

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </Link>
            <span className="text-xl font-semibold text-foreground tracking-tight">
              Connect VN-JP
            </span>
            <div className="flex items-center gap-3">
              <span className="text-sm text-muted-foreground">Already have an account?</span>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/login">Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-28 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="bg-card rounded-2xl border border-border p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-foreground">
              Create your Account
            </h1>
            <p className="mt-2 text-muted-foreground">
              Tell us a bit about yourself to find the best matches.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              <div className="space-y-5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">01</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Basic Information
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Full Name
                    </label>
                    <Input placeholder="Enter your full name" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Email or Phone Number
                    </label>
                    <Input placeholder="example@connect.com" type="email" />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Password
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
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
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">02</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Your Purpose
                  </span>
                </div>

                <p className="text-sm font-medium text-foreground">
                  What are you looking for?
                </p>

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
                      {purpose}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-primary">03</span>
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Your Interests
                  </span>
                </div>

                <p className="text-sm font-medium text-foreground">
                  Select your interests
                </p>

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
                      {interest}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Complete Registration
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-foreground hover:text-primary transition-colors"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </main>

      <footer className="py-6 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2026 Connect VN-JP. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
