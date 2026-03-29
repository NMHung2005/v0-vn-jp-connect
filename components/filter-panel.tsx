"use client"

import { X, Check } from "lucide-react"
import { cn } from "@/lib/utils"

interface FilterPanelProps {
  isOpen: boolean
  onClose: () => void
  filters: {
    ageRange: [number, number]
    distance: number
    nationality: string[]
    verifiedOnly: boolean
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

export function FilterPanel({ isOpen, onClose, filters, onFiltersChange }: FilterPanelProps) {
  const handleAgeChange = (index: 0 | 1, value: number) => {
    const newRange: [number, number] = [...filters.ageRange] as [number, number]
    newRange[index] = value
    onFiltersChange({ ...filters, ageRange: newRange })
  }

  const handleNationalityToggle = (nat: string) => {
    const newNationality = filters.nationality.includes(nat)
      ? filters.nationality.filter(n => n !== nat)
      : [...filters.nationality, nat]
    onFiltersChange({ ...filters, nationality: newNationality })
  }

  const handleInterestToggle = (interest: string) => {
    const newInterests = filters.interests.includes(interest)
      ? filters.interests.filter(i => i !== interest)
      : [...filters.interests, interest]
    onFiltersChange({ ...filters, interests: newInterests })
  }

  const resetFilters = () => {
    onFiltersChange({
      ageRange: [18, 50],
      distance: 100,
      nationality: ["VN", "JP"],
      verifiedOnly: false,
      interests: []
    })
  }

  if (!isOpen) return null

  return (
    <div className="w-80 bg-card border-l border-border h-screen overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-card z-10 p-4 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Search Filters</h2>
        <button
          onClick={onClose}
          className="p-1.5 hover:bg-muted rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>

      <div className="p-4 space-y-6">
        {/* Age Range */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Age: {filters.ageRange[0]} - {filters.ageRange[1]} years
          </label>
          <div className="space-y-2">
            <input
              type="range"
              min={18}
              max={60}
              value={filters.ageRange[0]}
              onChange={(e) => handleAgeChange(0, parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
            <input
              type="range"
              min={18}
              max={60}
              value={filters.ageRange[1]}
              onChange={(e) => handleAgeChange(1, parseInt(e.target.value))}
              className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
            />
          </div>
        </div>

        {/* Distance */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">
            Distance: {filters.distance} km
          </label>
          <input
            type="range"
            min={1}
            max={500}
            value={filters.distance}
            onChange={(e) => onFiltersChange({ ...filters, distance: parseInt(e.target.value) })}
            className="w-full h-2 bg-muted rounded-full appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Nationality */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Nationality</label>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                filters.nationality.length === 2 
                  ? "bg-primary border-primary" 
                  : "border-border"
              )}>
                {filters.nationality.length === 2 && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
              <span className="text-foreground">All</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer pl-4">
              <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                filters.nationality.includes("VN") 
                  ? "bg-primary border-primary" 
                  : "border-border"
              )}
              onClick={() => handleNationalityToggle("VN")}
              >
                {filters.nationality.includes("VN") && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
              <span className="text-muted-foreground">Vietnam</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer pl-4">
              <div className={cn(
                "w-5 h-5 rounded border-2 flex items-center justify-center transition-colors",
                filters.nationality.includes("JP") 
                  ? "bg-primary border-primary" 
                  : "border-border"
              )}
              onClick={() => handleNationalityToggle("JP")}
              >
                {filters.nationality.includes("JP") && <Check className="w-3 h-3 text-primary-foreground" />}
              </div>
              <span className="text-muted-foreground">Japan</span>
            </label>
          </div>
        </div>

        {/* Verified Only */}
        <div className="space-y-3">
          <label 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onFiltersChange({ ...filters, verifiedOnly: !filters.verifiedOnly })}
          >
            <div className={cn(
              "w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors",
              filters.verifiedOnly 
                ? "bg-primary border-primary" 
                : "border-border"
            )}>
              {filters.verifiedOnly && <Check className="w-3 h-3 text-primary-foreground" />}
            </div>
            <span className="text-foreground">Verified accounts only</span>
          </label>
        </div>

        {/* Interests */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-foreground">Interests</label>
          <div className="flex flex-wrap gap-2">
            {allInterests.map((interest) => (
              <button
                key={interest}
                onClick={() => handleInterestToggle(interest)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-colors",
                  filters.interests.includes(interest)
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetFilters}
          className="w-full py-3 border border-border rounded-xl text-foreground font-medium hover:bg-muted transition-colors"
        >
          Reset Filters
        </button>
      </div>
    </div>
  )
}
