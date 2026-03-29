"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, Award, Languages, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

interface Language {
  language: string
  level: string
  certificate: string | null
}

interface LanguageSkillsTabProps {
  user: {
    languages: Language[]
  }
  onUpdate: (updates: Record<string, unknown>) => void
}

const languageOptions = [
  "Vietnamese",
  "Japanese",
  "English",
  "Chinese",
  "Korean",
  "French",
  "German",
  "Spanish",
]

const levelOptions = [
  { value: "Native", label: "Native", color: "bg-emerald-500" },
  { value: "Fluent", label: "Fluent", color: "bg-blue-500" },
  { value: "Advanced", label: "Advanced", color: "bg-violet-500" },
  { value: "Intermediate", label: "Intermediate", color: "bg-amber-500" },
  { value: "Basic", label: "Basic", color: "bg-gray-400" },
]

const jlptLevels = ["N1", "N2", "N3", "N4", "N5"]

export function LanguageSkillsTab({ user, onUpdate }: LanguageSkillsTabProps) {
  const [isAddingLanguage, setIsAddingLanguage] = useState(false)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [newLanguage, setNewLanguage] = useState<Language>({
    language: "",
    level: "",
    certificate: null,
  })

  const handleAddLanguage = () => {
    if (newLanguage.language && newLanguage.level) {
      onUpdate({
        languages: [...user.languages, newLanguage],
      })
      setNewLanguage({ language: "", level: "", certificate: null })
      setIsAddingLanguage(false)
    }
  }

  const handleUpdateLanguage = (index: number, updates: Partial<Language>) => {
    const updatedLanguages = [...user.languages]
    updatedLanguages[index] = { ...updatedLanguages[index], ...updates }
    onUpdate({ languages: updatedLanguages })
  }

  const handleDeleteLanguage = (index: number) => {
    const updatedLanguages = user.languages.filter((_, i) => i !== index)
    onUpdate({ languages: updatedLanguages })
  }

  const getLevelColor = (level: string) => {
    const levelOption = levelOptions.find((l) => l.value === level || level.includes(l.value))
    return levelOption?.color || "bg-gray-400"
  }

  const getLevelProgress = (level: string) => {
    if (level === "Native") return 100
    if (level === "Fluent" || level === "N1") return 90
    if (level === "Advanced" || level === "N2") return 75
    if (level === "Intermediate" || level === "N3") return 55
    if (level.includes("N4")) return 35
    if (level === "Basic" || level.includes("N5")) return 20
    return 50
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Language Skills</h3>
          <p className="text-sm text-muted-foreground">
            Showcase your language abilities and certifications
          </p>
        </div>
        <Button onClick={() => setIsAddingLanguage(true)} size="sm">
          <Plus className="w-4 h-4 mr-1" />
          Add Language
        </Button>
      </div>

      {/* Languages List */}
      <div className="space-y-4">
        {user.languages.map((lang, index) => (
          <div
            key={index}
            className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border hover:border-primary/30 transition-colors"
          >
            <div className="p-3 bg-primary/10 rounded-xl">
              <Languages className="w-6 h-6 text-primary" />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-foreground">{lang.language}</h4>
                <span
                  className={cn(
                    "px-2 py-0.5 text-xs font-medium text-white rounded-full",
                    getLevelColor(lang.level)
                  )}
                >
                  {lang.level}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2 bg-muted rounded-full overflow-hidden mb-2">
                <div
                  className={cn("h-full rounded-full transition-all", getLevelColor(lang.level))}
                  style={{ width: `${getLevelProgress(lang.level)}%` }}
                />
              </div>

              {lang.certificate && (
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{lang.certificate}</span>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setEditingIndex(index)}
              >
                <Edit2 className="w-4 h-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-destructive hover:text-destructive"
                onClick={() => handleDeleteLanguage(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* JLPT Info Card */}
      <div className="mt-8 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/10">
        <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
          <Award className="w-5 h-5 text-primary" />
          JLPT Certification Levels
        </h4>
        <div className="grid grid-cols-5 gap-2 text-center text-sm">
          {jlptLevels.map((level) => (
            <div key={level} className="p-2 bg-background rounded-lg">
              <span className="font-bold text-foreground">{level}</span>
              <p className="text-xs text-muted-foreground mt-1">
                {level === "N1" && "Advanced"}
                {level === "N2" && "Upper-Int"}
                {level === "N3" && "Intermediate"}
                {level === "N4" && "Elementary"}
                {level === "N5" && "Basic"}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Add Language Dialog */}
      <Dialog open={isAddingLanguage} onOpenChange={setIsAddingLanguage}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Language</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Language</Label>
              <Select
                value={newLanguage.language}
                onValueChange={(value) =>
                  setNewLanguage((prev) => ({ ...prev, language: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languageOptions.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Proficiency Level</Label>
              <Select
                value={newLanguage.level}
                onValueChange={(value) =>
                  setNewLanguage((prev) => ({ ...prev, level: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  {levelOptions.map((level) => (
                    <SelectItem key={level.value} value={level.value}>
                      {level.label}
                    </SelectItem>
                  ))}
                  {newLanguage.language === "Japanese" &&
                    jlptLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        JLPT {level}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Certificate (Optional)</Label>
              <Input
                value={newLanguage.certificate || ""}
                onChange={(e) =>
                  setNewLanguage((prev) => ({ ...prev, certificate: e.target.value || null }))
                }
                placeholder="e.g., JLPT N2, IELTS 7.0"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddingLanguage(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLanguage}>Add Language</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Language Dialog */}
      {editingIndex !== null && (
        <Dialog open={editingIndex !== null} onOpenChange={() => setEditingIndex(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Language</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Language</Label>
                <Select
                  value={user.languages[editingIndex]?.language}
                  onValueChange={(value) => handleUpdateLanguage(editingIndex, { language: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languageOptions.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Proficiency Level</Label>
                <Select
                  value={user.languages[editingIndex]?.level}
                  onValueChange={(value) => handleUpdateLanguage(editingIndex, { level: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {levelOptions.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        {level.label}
                      </SelectItem>
                    ))}
                    {jlptLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        JLPT {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Certificate (Optional)</Label>
                <Input
                  value={user.languages[editingIndex]?.certificate || ""}
                  onChange={(e) =>
                    handleUpdateLanguage(editingIndex, { certificate: e.target.value || null })
                  }
                  placeholder="e.g., JLPT N2, IELTS 7.0"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setEditingIndex(null)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
