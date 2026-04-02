"use client"

import { useState } from "react"
import { Plus, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface InterestsTabProps {
  user: {
    interests: string[]
  }
  onUpdate: (updates: Record<string, unknown>) => void
}

const suggestedInterests = [
  { category: "Culture", items: ["Anime", "Manga", "J-Pop", "K-Pop", "Vietnamese Music", "Traditional Arts", "Festivals", "Tea Ceremony"] },
  { category: "Language", items: ["Language Learning", "JLPT Study", "Translation", "Interpretation", "Calligraphy"] },
  { category: "Food", items: ["Cooking", "Japanese Cuisine", "Vietnamese Food", "Ramen", "Sushi", "Pho", "Boba Tea", "Coffee"] },
  { category: "Lifestyle", items: ["Travel", "Photography", "Gaming", "Sports", "Fitness", "Yoga", "Hiking", "Cycling"] },
  { category: "Arts", items: ["Music", "Movies", "Literature", "Poetry", "Drawing", "Painting", "Crafts"] },
  { category: "Technology", items: ["Technology", "Programming", "AI", "Startups", "Design", "Web Development"] },
]

export function InterestsTab({ user, onUpdate }: InterestsTabProps) {
  const t = useTranslations("Profile")
  const tr = useTranslations("Register")
  
  const [newInterest, setNewInterest] = useState("")
  const [isAddingCustom, setIsAddingCustom] = useState(false)

  const handleToggleInterest = (interest: string) => {
    const isSelected = user.interests.includes(interest)
    const updatedInterests = isSelected
      ? user.interests.filter((i) => i !== interest)
      : [...user.interests, interest]
    onUpdate({ interests: updatedInterests })
  }

  const handleAddCustomInterest = () => {
    if (newInterest.trim() && !user.interests.includes(newInterest.trim())) {
      onUpdate({ interests: [...user.interests, newInterest.trim()] })
      setNewInterest("")
      setIsAddingCustom(false)
    }
  }

  const handleRemoveInterest = (interest: string) => {
    onUpdate({ interests: user.interests.filter((i) => i !== interest) })
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{t("interestsTitle")}</h3>
          <p className="text-sm text-muted-foreground">
            {t("interestsDesc")}
          </p>
        </div>
      </div>

      {/* Selected Interests */}
      <div className="mb-8">
        <h4 className="text-sm font-medium text-foreground mb-3">{t("yourInterests")} ({user.interests.length})</h4>
        <div className="flex flex-wrap gap-2">
          {user.interests.map((interest) => (
            <span
              key={interest}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium"
            >
              {tr(`interests.${interest}`) || interest}
              <button
                onClick={() => handleRemoveInterest(interest)}
                className="p-0.5 hover:bg-primary-foreground/20 rounded-full transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {isAddingCustom ? (
            <div className="flex items-center gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder={t("enterInterest")}
                className="h-8 w-40"
                onKeyDown={(e) => e.key === "Enter" && handleAddCustomInterest()}
                autoFocus
              />
              <Button size="sm" className="h-8 px-2" onClick={handleAddCustomInterest}>
                <Check className="w-4 h-4" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 px-2"
                onClick={() => {
                  setIsAddingCustom(false)
                  setNewInterest("")
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <button
              onClick={() => setIsAddingCustom(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground rounded-full text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              {t("addCustom")}
            </button>
          )}
        </div>
      </div>

      {/* Suggested Interests */}
      <div className="space-y-6">
        <h4 className="text-sm font-medium text-foreground">{t("suggestedInterests")}</h4>
        
        {suggestedInterests.map((category) => (
          <div key={category.category}>
            <h5 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              {t(`interestCategories.${category.category}`) || category.category}
            </h5>
            <div className="flex flex-wrap gap-2">
              {category.items.map((interest) => {
                const isSelected = user.interests.includes(interest)
                return (
                  <button
                    key={interest}
                    onClick={() => handleToggleInterest(interest)}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                      isSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground"
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {tr(`interests.${interest}`) || interest}
                  </button>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
