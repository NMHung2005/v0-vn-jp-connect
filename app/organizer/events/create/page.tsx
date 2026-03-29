"use client"

import { useState } from "react"
import { Calendar, Clock, MapPin, Users, Image as ImageIcon, ArrowLeft, Save, Eye, Globe, FileText } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

type EventType = "online" | "offline" | "hybrid"

interface EventFormData {
  title: string
  description: string
  eventType: EventType
  startDate: string
  startTime: string
  endDate: string
  endTime: string
  location: string
  onlineLink: string
  maxParticipants: string
  language: string
  category: string
  coverImage: string | null
}

const categories = [
  "Cultural Exchange",
  "Language Learning",
  "Business Networking",
  "Food & Cooking",
  "Art & Music",
  "Sports & Recreation",
  "Education & Workshop",
  "Community Meetup",
  "Other"
]

const languages = [
  "Vietnamese",
  "Japanese",
  "English",
  "Vietnamese & Japanese",
  "All Languages"
]

export default function CreateEventPage() {
  const [formData, setFormData] = useState<EventFormData>({
    title: "",
    description: "",
    eventType: "offline",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    location: "",
    onlineLink: "",
    maxParticipants: "",
    language: "",
    category: "",
    coverImage: null
  })

  const [isPreview, setIsPreview] = useState(false)

  const handleInputChange = (field: keyof EventFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent, isDraft: boolean) => {
    e.preventDefault()
    console.log("Submitting event:", { ...formData, isDraft })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/organizer/events" className="p-2 hover:bg-muted rounded-lg transition-colors">
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </Link>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Create New Event</h1>
                <p className="text-sm text-muted-foreground">Fill in the details to create your event</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPreview(!isPreview)}
                className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                {isPreview ? "Edit" : "Preview"}
              </button>
              <button
                onClick={(e) => handleSubmit(e, true)}
                className="px-4 py-2 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Save Draft
              </button>
              <button
                onClick={(e) => handleSubmit(e, false)}
                className="px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Publish Event
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {isPreview ? (
          /* Preview Mode */
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            {/* Cover Image */}
            <div className="h-64 bg-muted flex items-center justify-center">
              {formData.coverImage ? (
                <img src={formData.coverImage} alt="Event cover" className="w-full h-full object-cover" />
              ) : (
                <div className="text-center text-muted-foreground">
                  <ImageIcon className="w-12 h-12 mx-auto mb-2" />
                  <p>No cover image</p>
                </div>
              )}
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={cn(
                  "px-3 py-1 text-sm rounded-full font-medium",
                  formData.eventType === "online" ? "bg-blue-100 text-blue-700" :
                  formData.eventType === "offline" ? "bg-emerald-100 text-emerald-700" :
                  "bg-purple-100 text-purple-700"
                )}>
                  {formData.eventType === "online" ? "Online" : formData.eventType === "offline" ? "In-Person" : "Hybrid"}
                </span>
                {formData.category && (
                  <span className="px-3 py-1 text-sm rounded-full bg-muted text-muted-foreground">
                    {formData.category}
                  </span>
                )}
              </div>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                {formData.title || "Event Title"}
              </h2>
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>
                    {formData.startDate ? new Date(formData.startDate).toLocaleDateString("en-US", { 
                      weekday: "long", year: "numeric", month: "long", day: "numeric" 
                    }) : "Date not set"}
                  </span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Clock className="w-5 h-5" />
                  <span>{formData.startTime || "00:00"} - {formData.endTime || "00:00"}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <MapPin className="w-5 h-5" />
                  <span>{formData.location || formData.onlineLink || "Location not set"}</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <Users className="w-5 h-5" />
                  <span>{formData.maxParticipants || "Unlimited"} participants max</span>
                </div>
              </div>
              <div className="border-t border-border pt-6">
                <h3 className="text-lg font-semibold text-foreground mb-3">About this event</h3>
                <p className="text-muted-foreground whitespace-pre-wrap">
                  {formData.description || "No description provided"}
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Edit Mode */
          <form className="space-y-8">
            {/* Basic Info */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Basic Information
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Event Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="Enter a compelling title for your event"
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Describe your event, what participants can expect, any requirements, etc."
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange("category", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select a category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Language <span className="text-red-500">*</span>
                    </label>
                    <select
                      value={formData.language}
                      onChange={(e) => handleInputChange("language", e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select language</option>
                      {languages.map(lang => (
                        <option key={lang} value={lang}>{lang}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Event Type & Location */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Event Type & Location
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">
                    Event Type <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-4">
                    {[
                      { value: "offline", label: "In-Person", icon: MapPin },
                      { value: "online", label: "Online", icon: Globe },
                      { value: "hybrid", label: "Hybrid", icon: Users }
                    ].map(type => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleInputChange("eventType", type.value)}
                        className={cn(
                          "flex-1 p-4 border rounded-lg transition-colors flex flex-col items-center gap-2",
                          formData.eventType === type.value
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-border hover:border-primary/50 text-muted-foreground"
                        )}
                      >
                        <type.icon className="w-6 h-6" />
                        <span className="font-medium">{type.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {(formData.eventType === "offline" || formData.eventType === "hybrid") && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Physical Location <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Enter the venue address"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                )}

                {(formData.eventType === "online" || formData.eventType === "hybrid") && (
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Online Meeting Link <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      value={formData.onlineLink}
                      onChange={(e) => handleInputChange("onlineLink", e.target.value)}
                      placeholder="Zoom, Google Meet, or other meeting link"
                      className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Date & Time
              </h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleInputChange("startDate", e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Start Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => handleInputChange("startTime", e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleInputChange("endDate", e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    End Time <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => handleInputChange("endTime", e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            </div>

            {/* Capacity & Cover Image */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-lg font-semibold text-foreground mb-6 flex items-center gap-2">
                <Users className="w-5 h-5" />
                Capacity & Media
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Maximum Participants
                  </label>
                  <input
                    type="number"
                    value={formData.maxParticipants}
                    onChange={(e) => handleInputChange("maxParticipants", e.target.value)}
                    placeholder="Leave empty for unlimited"
                    min="1"
                    className="w-full max-w-xs px-4 py-3 bg-background border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Set a limit on how many people can register for this event
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Cover Image
                  </label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <ImageIcon className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground mb-2">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">
                      PNG, JPG up to 5MB (Recommended: 1920x1080)
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4">
              <Link
                href="/organizer/events"
                className="px-6 py-3 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={(e) => handleSubmit(e, true)}
                className="px-6 py-3 text-sm font-medium bg-muted text-muted-foreground rounded-lg hover:bg-muted/80 transition-colors"
              >
                Save as Draft
              </button>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e, false)}
                className="px-6 py-3 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Publish Event
              </button>
            </div>
          </form>
        )}
      </main>
    </div>
  )
}
