"use client"

import { useState } from "react"
import { Search, Calendar, MapPin, Users, Filter, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const events = [
  {
    id: 1,
    title: "VN-JP Cultural Exchange Night",
    category: "Cultural Exchange",
    date: "Apr 5, 2026",
    time: "6:30 PM",
    location: "Japan Foundation, Hanoi",
    attendees: 45,
    maxAttendees: 60,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=200&fit=crop",
    isInterested: true,
  },
  {
    id: 2,
    title: "Vietnamese-Japanese Language Exchange Cafe",
    category: "Language Exchange",
    date: "Apr 8, 2026",
    time: "3:00 PM",
    location: "Tranquil Books & Coffee, Hoan Kiem",
    attendees: 18,
    maxAttendees: 25,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=200&fit=crop",
    isInterested: false,
  },
  {
    id: 3,
    title: "Japanese Traditional Tea Ceremony Workshop",
    category: "Cultural Exchange",
    date: "Apr 12, 2026",
    time: "10:00 AM",
    location: "Zen Garden Cafe, Ba Dinh",
    attendees: 8,
    maxAttendees: 12,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=200&fit=crop",
    isInterested: true,
  },
  {
    id: 4,
    title: "VN-JP Photography Club Meetup",
    category: "Photography",
    date: "Apr 15, 2026",
    time: "8:00 AM",
    location: "West Lake, Tay Ho",
    attendees: 22,
    maxAttendees: 30,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=200&fit=crop",
    isInterested: false,
  },
  {
    id: 5,
    title: "Japanese Cooking Class - Sushi & Ramen",
    category: "Culinary Exchange",
    date: "Apr 18, 2026",
    time: "2:00 PM",
    location: "Cooking Studio, Tay Ho",
    attendees: 12,
    maxAttendees: 15,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=200&fit=crop",
    isInterested: false,
  },
  {
    id: 6,
    title: "VN-JP Anime & Manga Fan Meetup",
    category: "Pop Culture",
    date: "Apr 22, 2026",
    time: "4:00 PM",
    location: "Comic City, Cau Giay",
    attendees: 35,
    maxAttendees: 50,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=200&fit=crop",
    isInterested: true,
  },
  {
    id: 7,
    title: "Vietnamese Ao Dai & Japanese Kimono Festival",
    category: "Cultural Exchange",
    date: "Apr 26, 2026",
    time: "9:00 AM",
    location: "Temple of Literature, Dong Da",
    attendees: 80,
    maxAttendees: 100,
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&h=200&fit=crop",
    isInterested: false,
  },
  {
    id: 8,
    title: "VN-JP Business Networking Night",
    category: "Networking",
    date: "Apr 29, 2026",
    time: "6:00 PM",
    location: "Lotte Hotel, Ba Dinh",
    attendees: 55,
    maxAttendees: 80,
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=400&h=200&fit=crop",
    isInterested: false,
  },
]

const categories = ["All", "Cultural Exchange", "Language Exchange", "Photography", "Culinary Exchange", "Pop Culture", "Networking"]

interface EventListProps {
  selectedEventId: number | null
  onSelectEvent: (id: number) => void
}

export function EventList({ selectedEventId, onSelectEvent }: EventListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [showFilters, setShowFilters] = useState(false)

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || event.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Cultural Exchange":
        return "bg-emerald-100 text-emerald-700 border-emerald-200"
      case "Language Exchange":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Photography":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "Culinary Exchange":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "Pop Culture":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Networking":
        return "bg-slate-100 text-slate-700 border-slate-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const t = useTranslations("Events")
  const tf = useTranslations("Filters")

  return (
    <div className="w-96 border-r border-border flex flex-col bg-card">
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">{t("title")}</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            {tf("title")}
            <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:border-primary/50"
                )}
              >
                {t("categories." + category)}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground text-center px-4">
            <Calendar className="w-8 h-8 mb-2 opacity-50" />
            <p>{t("noEventsFound")}</p>
          </div>
        ) : (
          <div className="p-3 space-y-3">
            {filteredEvents.map((event, index) => {
              const eventIndex = events.findIndex(e => e.id === event.id)
              const translatedTitle = t(`eventList.${eventIndex}.title`)
              const translatedLocation = t(`eventList.${eventIndex}.location`)
              
              return (
                <button
                  key={event.id}
                  onClick={() => onSelectEvent(event.id)}
                  className={cn(
                    "w-full text-left rounded-xl overflow-hidden border transition-all",
                    selectedEventId === event.id
                      ? "border-primary shadow-md ring-1 ring-primary/20"
                      : "border-border hover:border-primary/50 hover:shadow-sm"
                  )}
                >
                  <div className="relative h-28">
                    <img
                      src={event.image}
                      alt={translatedTitle}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge className={cn("text-xs", getCategoryColor(event.category))}>
                        {t("categories." + event.category)}
                      </Badge>
                    </div>
                    {event.isInterested && (
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-primary text-primary-foreground text-xs">
                          ★
                        </Badge>
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-card">
                    <h3 className="font-semibold text-foreground line-clamp-1">{translatedTitle}</h3>
                    <div className="mt-2 space-y-1">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{event.date} {t("at")} {event.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-3.5 h-3.5" />
                        <span className="line-clamp-1">{translatedLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-3.5 h-3.5" />
                        <span>{event.attendees}/{event.maxAttendees}</span>
                      </div>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
