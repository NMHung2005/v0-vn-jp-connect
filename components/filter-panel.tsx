"use client"

import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    ageRange: [number, number]
    distance: number
    nationality: string[]
    gender: string
    japaneseLevel: string[]
    interests: string[]
  }
  onFiltersChange: (filters: FilterPanelProps["filters"]) => void
}

const allInterests = [
  "Travel", "Anime", "Food", "Photography", "Language Learning", "Yoga",
  "Coffee", "Literature", "Technology", "Gaming", "Programming", "Manga",
  "Education", "Music", "Cooking", "Art", "Tea Ceremony", "Karaoke",
  "Sports", "Movies"
]

const japaneseLevels = ["N1", "N2", "N3", "N4", "N5", "Basic", "Native"]

export function FilterPanel({ isOpen, onClose, filters, onFiltersChange }: FilterPanelProps) {
  const t = useTranslations("Filters")
  const r = useTranslations("Register")

  const handleAgeChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.ageRange] as [number, number]
    newRange[index] = value
    
    // Ensure min <= max
    if (index === 0 && newRange[0] > newRange[1]) {
      newRange[1] = newRange[0]
    } else if (index === 1 && newRange[1] < newRange[0]) {
      newRange[0] = newRange[1]
    }
    
    onFiltersChange({ ...filters, ageRange: newRange })
  }

  const handleNationalityToggle = (nat: string) => {
    const newNationality = filters.nationality.includes(nat)
      ? filters.nationality.filter(n => n !== nat)
      : [...filters.nationality, nat]
    onFiltersChange({ ...filters, nationality: newNationality })
  }

  const handleJapaneseLevelToggle = (level: string) => {
    const newLevels = filters.japaneseLevel.includes(level)
      ? filters.japaneseLevel.filter(l => l !== level)
      : [...filters.japaneseLevel, level]
    onFiltersChange({ ...filters, japaneseLevel: newLevels })
  }

  const handleInterestToggle = (interest: string) => {
    const newInterests = filters.interests.includes(interest)
      ? filters.interests.filter(i => i !== interest)
      : [...filters.interests, interest]
    onFiltersChange({ ...filters, interests: newInterests })
  }

  const resetFilters = () => {
    onFiltersChange({
      ageRange: [18, 35],
      distance: 50,
      nationality: ["VN", "JP"],
      gender: "all",
      japaneseLevel: [],
      interests: []
    })
  }

  if (!isOpen) return null

  return (
    <div className="w-80 bg-card border-l border-border h-screen overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">{t("title")}</h2>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Gender */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">{t("gender")}</label>
          <div className="grid grid-cols-3 gap-2">
            {["all", "male", "female"].map((g) => (
              <button
                key={g}
                onClick={() => onFiltersChange({ ...filters, gender: g })}
                className={cn(
                  "px-2 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors border",
                  filters.gender === g
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground hover:bg-muted"
                )}
              >
                {t("genders." + g)}
              </button>
            ))}
          </div>
        </div>

        {/* Age Range */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">{t("ageRange")}</label>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {filters.ageRange[0]} - {filters.ageRange[1]}
            </span>
          </div>
          <div className="space-y-4 pt-2">
            <div className="relative h-1.5 bg-muted rounded-full">
              <input
                type="range"
                min={18}
                max={60}
                value={filters.ageRange[0]}
                onChange={(e) => handleAgeChange(0, parseInt(e.target.value))}
                className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer accent-primary pointer-events-auto"
              />
              <input
                type="range"
                min={18}
                max={60}
                value={filters.ageRange[1]}
                onChange={(e) => handleAgeChange(1, parseInt(e.target.value))}
                className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer accent-primary pointer-events-auto"
              />
            </div>
          </div>
        </div>

        {/* Distance */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <label className="text-sm font-medium text-foreground">{t("distance")}</label>
            <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {filters.distance} km
            </span>
          </div>
          <input
            type="range"
            min={1}
            max={500}
            value={filters.distance}
            onChange={(e) => onFiltersChange({ ...filters, distance: parseInt(e.target.value) })}
            className="w-full h-1.5 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Japanese Level */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">{t("japaneseLevel")}</label>
          <div className="flex flex-wrap gap-2">
            {japaneseLevels.map((level) => (
              <button
                key={level}
                onClick={() => handleJapaneseLevelToggle(level)}
                className={cn(
                  "px-2.5 py-1 rounded-full text-xs font-medium transition-colors border",
                  filters.japaneseLevel.includes(level)
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-muted border-transparent text-muted-foreground hover:bg-muted/80"
                )}
              >
                {level.toLowerCase() === "basic" ? r("levels.none") : level.toLowerCase() === "native" ? r("levels.native") : level}
              </button>
            ))}
          </div>
        </div>

        {/* Nationality */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">{t("nationality")}</label>
          <div className="flex gap-2">
            {["VN", "JP"].map((nat) => (
              <button
                key={nat}
                onClick={() => handleNationalityToggle(nat)}
                className={cn(
                  "flex-1 px-3 py-2 rounded-xl text-sm font-medium transition-all border flex items-center justify-center gap-2",
                  filters.nationality.includes(nat)
                    ? "bg-primary border-primary text-primary-foreground"
                    : "bg-card border-border text-muted-foreground hover:bg-muted"
                )}
              >
                {filters.nationality.includes(nat) && <Check className="w-4 h-4" />}
                {t("nationalities." + nat)}
              </button>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">{t("interests")}</label>
          <div className="flex flex-wrap gap-2">
            {allInterests.slice(0, 12).map((interest) => {
              const displayName = r("interests." + interest)
              const finalName = displayName?.includes("interests.") ? interest : displayName
              
              return (
                <button
                  key={interest}
                  onClick={() => handleInterestToggle(interest)}
                  className={cn(
                    "px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors text-left flex-auto min-w-0 max-w-full break-words whitespace-normal",
                    filters.interests.includes(interest)
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  )}
                >
                  {finalName}
                </button>
              )
            })}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="w-full py-2.5 bg-muted text-muted-foreground rounded-xl text-sm font-medium hover:bg-muted/80 transition-colors mt-4"
        >
          {t("reset")}
        </button>
      </div>
    </div>
  )
}
