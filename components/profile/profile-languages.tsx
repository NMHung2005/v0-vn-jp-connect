"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Languages } from "lucide-react"
import { cn } from "@/lib/utils"

interface Language {
  name: string
  level: string
  proficiency: number
}

interface ProfileLanguagesProps {
  languages: Language[]
}

export function ProfileLanguages({ languages }: ProfileLanguagesProps) {
  const getProgressColor = (proficiency: number) => {
    if (proficiency >= 80) return "bg-emerald-500"
    if (proficiency >= 50) return "bg-sky-500"
    return "bg-amber-500"
  }

  const getLevelBadgeColor = (level: string) => {
    if (level === "Native") return "bg-emerald-500/10 text-emerald-600"
    if (level === "Advanced" || level.includes("N1") || level.includes("N2")) return "bg-sky-500/10 text-sky-600"
    if (level === "Intermediate" || level.includes("N3")) return "bg-amber-500/10 text-amber-600"
    return "bg-muted text-muted-foreground"
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Languages className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Language Proficiency</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        {languages.map((language) => (
          <div key={language.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-medium text-foreground">{language.name}</span>
              <span className={cn("px-2.5 py-1 rounded-full text-xs font-medium", getLevelBadgeColor(language.level))}>
                {language.level}
              </span>
            </div>
            <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-muted">
              <div 
                className={cn("h-full rounded-full transition-all duration-500", getProgressColor(language.proficiency))}
                style={{ width: `${language.proficiency}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground text-right">{language.proficiency}%</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
