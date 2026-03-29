"use client"

import { useState } from "react"
import Image from "next/image"
import {
  Edit2,
  Save,
  X,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  User,
  Calendar,
  Flag,
  Languages,
  Award,
  Plus,
  Check,
  Trash2,
  Star,
  Upload,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface Language {
  language: string
  level: string
  certificate: string | null
}

interface ProfileContentProps {
  user: {
    name: string
    email: string
    age: number
    gender: string
    nationality: string
    location: string
    occupation: string
    education: string
    languages: Language[]
    interests: string[]
    photos: string[]
    avatar: string
    socialLinks: {
      instagram: string
      facebook: string
      line: string
    }
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

const suggestedInterests = [
  "Anime",
  "Manga",
  "J-Pop",
  "K-Pop",
  "Language Learning",
  "Travel",
  "Photography",
  "Gaming",
  "Cooking",
  "Coffee",
  "Technology",
  "Music",
  "Movies",
  "Sports",
  "Fitness",
]

export function ProfileContent({ user, onUpdate }: ProfileContentProps) {
  const [isEditingPersonal, setIsEditingPersonal] = useState(false)
  const [isAddingLanguage, setIsAddingLanguage] = useState(false)
  const [newInterest, setNewInterest] = useState("")
  const [isAddingCustomInterest, setIsAddingCustomInterest] = useState(false)
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    age: user.age,
    gender: user.gender,
    nationality: user.nationality,
    location: user.location,
    occupation: user.occupation,
    education: user.education,
    instagram: user.socialLinks.instagram,
    facebook: user.socialLinks.facebook,
    line: user.socialLinks.line,
  })

  const [newLanguage, setNewLanguage] = useState<Language>({
    language: "",
    level: "",
    certificate: null,
  })

  const handleSavePersonal = () => {
    onUpdate({
      name: formData.name,
      email: formData.email,
      age: formData.age,
      gender: formData.gender,
      nationality: formData.nationality,
      location: formData.location,
      occupation: formData.occupation,
      education: formData.education,
      socialLinks: {
        instagram: formData.instagram,
        facebook: formData.facebook,
        line: formData.line,
      },
    })
    setIsEditingPersonal(false)
  }

  const handleCancelPersonal = () => {
    setFormData({
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      nationality: user.nationality,
      location: user.location,
      occupation: user.occupation,
      education: user.education,
      instagram: user.socialLinks.instagram,
      facebook: user.socialLinks.facebook,
      line: user.socialLinks.line,
    })
    setIsEditingPersonal(false)
  }

  const handleAddLanguage = () => {
    if (newLanguage.language && newLanguage.level) {
      onUpdate({
        languages: [...user.languages, newLanguage],
      })
      setNewLanguage({ language: "", level: "", certificate: null })
      setIsAddingLanguage(false)
    }
  }

  const handleDeleteLanguage = (index: number) => {
    const updatedLanguages = user.languages.filter((_, i) => i !== index)
    onUpdate({ languages: updatedLanguages })
  }

  const getLevelColor = (level: string) => {
    const levelOption = levelOptions.find((l) => l.value === level || level.includes(l.value))
    return levelOption?.color || "bg-gray-400"
  }

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
      setIsAddingCustomInterest(false)
    }
  }

  const handleRemoveInterest = (interest: string) => {
    onUpdate({ interests: user.interests.filter((i) => i !== interest) })
  }

  const handleSetAsMain = (photoUrl: string) => {
    onUpdate({ avatar: photoUrl })
  }

  const handleDeletePhoto = (photoUrl: string) => {
    const updatedPhotos = user.photos.filter((p) => p !== photoUrl)
    onUpdate({ photos: updatedPhotos })
  }

  const handleAddPhoto = () => {
    const samplePhotos = [
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    ]
    const randomPhoto = samplePhotos[Math.floor(Math.random() * samplePhotos.length)]
    if (!user.photos.includes(randomPhoto)) {
      onUpdate({ photos: [...user.photos, randomPhoto] })
    }
  }

  const InfoItem = ({
    icon: Icon,
    label,
    value,
    field,
    type = "text",
  }: {
    icon: React.ElementType
    label: string
    value: string | number
    field: keyof typeof formData
    type?: string
  }) => (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
        <Icon className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground">{label}</p>
        {isEditingPersonal ? (
          <Input
            type={type}
            value={formData[field]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [field]: type === "number" ? parseInt(e.target.value) : e.target.value,
              }))
            }
            className="h-8 mt-1"
          />
        ) : (
          <p className="font-medium text-foreground text-sm">{value}</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
          </div>
          {isEditingPersonal ? (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleCancelPersonal}>
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSavePersonal}>
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
            </div>
          ) : (
            <Button variant="outline" size="sm" onClick={() => setIsEditingPersonal(true)}>
              <Edit2 className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <InfoItem icon={User} label="Full Name" value={user.name} field="name" />
          <InfoItem icon={Mail} label="Email" value={user.email} field="email" type="email" />
          <InfoItem icon={Calendar} label="Age" value={user.age} field="age" type="number" />
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
            <div className="p-2 bg-primary/10 rounded-lg shrink-0">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground">Gender</p>
              {isEditingPersonal ? (
                <Select
                  value={formData.gender}
                  onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
                >
                  <SelectTrigger className="h-8 mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              ) : (
                <p className="font-medium text-foreground text-sm">{user.gender}</p>
              )}
            </div>
          </div>
          <InfoItem icon={Flag} label="Nationality" value={user.nationality} field="nationality" />
          <InfoItem icon={MapPin} label="Location" value={user.location} field="location" />
          <InfoItem icon={Briefcase} label="Occupation" value={user.occupation} field="occupation" />
          <InfoItem icon={GraduationCap} label="Education" value={user.education} field="education" />
        </div>

        {/* Social Links */}
        <div className="mt-6 pt-4 border-t border-border">
          <h4 className="text-sm font-medium text-foreground mb-3">Social Links</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <Label className="text-xs text-muted-foreground">Instagram</Label>
              {isEditingPersonal ? (
                <Input
                  value={formData.instagram}
                  onChange={(e) => setFormData((prev) => ({ ...prev, instagram: e.target.value }))}
                  placeholder="@username"
                  className="mt-1 h-8"
                />
              ) : (
                <p className="font-medium text-foreground text-sm mt-1">@{user.socialLinks.instagram}</p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <Label className="text-xs text-muted-foreground">Facebook</Label>
              {isEditingPersonal ? (
                <Input
                  value={formData.facebook}
                  onChange={(e) => setFormData((prev) => ({ ...prev, facebook: e.target.value }))}
                  placeholder="Username"
                  className="mt-1 h-8"
                />
              ) : (
                <p className="font-medium text-foreground text-sm mt-1">{user.socialLinks.facebook}</p>
              )}
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <Label className="text-xs text-muted-foreground">LINE</Label>
              {isEditingPersonal ? (
                <Input
                  value={formData.line}
                  onChange={(e) => setFormData((prev) => ({ ...prev, line: e.target.value }))}
                  placeholder="LINE ID"
                  className="mt-1 h-8"
                />
              ) : (
                <p className="font-medium text-foreground text-sm mt-1">{user.socialLinks.line}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Language Skills */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Languages className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Language Skills</h3>
          </div>
          <Button onClick={() => setIsAddingLanguage(true)} size="sm">
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {user.languages.map((lang, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/50 border border-border group"
            >
              <div className="p-2 bg-primary/10 rounded-lg">
                <Languages className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-foreground text-sm">{lang.language}</h4>
                  <span
                    className={cn(
                      "px-2 py-0.5 text-xs font-medium text-white rounded-full",
                      getLevelColor(lang.level)
                    )}
                  >
                    {lang.level}
                  </span>
                </div>
                {lang.certificate && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                    <Award className="w-3 h-3 text-amber-500" />
                    <span>{lang.certificate}</span>
                  </div>
                )}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                onClick={() => handleDeleteLanguage(index)}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
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
      </div>

      {/* Interests */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-lg">Interests & Hobbies</span>
        </div>

        {/* Selected Interests */}
        <div className="mb-4">
          <p className="text-sm text-muted-foreground mb-3">Your Interests ({user.interests.length})</p>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-full text-sm font-medium"
              >
                {interest}
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="p-0.5 hover:bg-primary-foreground/20 rounded-full transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {isAddingCustomInterest ? (
              <div className="flex items-center gap-2">
                <Input
                  value={newInterest}
                  onChange={(e) => setNewInterest(e.target.value)}
                  placeholder="Enter interest"
                  className="h-8 w-36"
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
                    setIsAddingCustomInterest(false)
                    setNewInterest("")
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <button
                onClick={() => setIsAddingCustomInterest(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted hover:bg-muted/80 text-muted-foreground rounded-full text-sm font-medium transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Custom
              </button>
            )}
          </div>
        </div>

        {/* Suggested Interests */}
        <div>
          <p className="text-sm text-muted-foreground mb-3">Suggested</p>
          <div className="flex flex-wrap gap-2">
            {suggestedInterests
              .filter((interest) => !user.interests.includes(interest))
              .slice(0, 10)
              .map((interest) => (
                <button
                  key={interest}
                  onClick={() => handleToggleInterest(interest)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground rounded-full text-sm font-medium transition-all"
                >
                  <Plus className="w-3 h-3" />
                  {interest}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* Photos */}
      <div className="bg-card rounded-xl border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-foreground">Photos</h3>
            <span className="text-sm text-muted-foreground">({user.photos.length}/9)</span>
          </div>
          <Button onClick={handleAddPhoto} size="sm" disabled={user.photos.length >= 9}>
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {user.photos.map((photo, index) => (
            <div
              key={photo}
              className={cn(
                "relative aspect-square w-full rounded-xl overflow-hidden border-2 transition-all cursor-pointer group",
                photo === user.avatar ? "border-primary" : "border-transparent hover:border-primary/50"
              )}
              onClick={() => setSelectedPhoto(photo)}
            >
              <Image src={photo} alt={`Photo ${index + 1}`} fill sizes="(max-width: 768px) 33vw, 16vw" className="object-cover" />

              {/* Main Photo Badge */}
              {photo === user.avatar && (
                <div className="absolute top-1 left-1 px-1.5 py-0.5 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-0.5">
                  <Star className="w-2.5 h-2.5 fill-current" />
                  Main
                </div>
              )}

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1">
                {photo !== user.avatar && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="h-7 text-xs"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleSetAsMain(photo)
                    }}
                  >
                    <Star className="w-3 h-3 mr-1" />
                    Main
                  </Button>
                )}
                <Button
                  size="sm"
                  variant="destructive"
                  className="h-7 text-xs"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeletePhoto(photo)
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                </Button>
              </div>
            </div>
          ))}

          {/* Add Photo Placeholder */}
          {user.photos.length < 9 && (
            <button
              onClick={handleAddPhoto}
              className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
            >
              <Upload className="w-5 h-5" />
              <span className="text-xs font-medium">Upload</span>
            </button>
          )}
        </div>
      </div>

      {/* Photo Viewer Dialog */}
      <Dialog open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <button
            onClick={() => setSelectedPhoto(null)}
            className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          {selectedPhoto && (
            <div className="relative aspect-square w-full">
              <Image src={selectedPhoto} alt="Photo preview" fill sizes="(max-width: 768px) 100vw, 672px" className="object-cover" />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
