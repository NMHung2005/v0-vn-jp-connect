"use client"

import { useState } from "react"
import { Search, Calendar, MapPin, Users, Filter, ChevronDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

const events = [
  {
    id: 1,
    title: "Photography Walk in Old Quarter",
    category: "Photography",
    date: "Apr 5, 2026",
    time: "9:00 AM",
    location: "Hoan Kiem Lake",
    attendees: 24,
    maxAttendees: 30,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=200&fit=crop",
    isInterested: true,
  },
  {
    id: 2,
    title: "VN-JP Cultural Exchange Night",
    category: "Cultural",
    date: "Apr 8, 2026",
    time: "6:30 PM",
    location: "Japan Foundation, Hanoi",
    attendees: 45,
    maxAttendees: 60,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=400&h=200&fit=crop",
    isInterested: false,
  },
  {
    id: 3,
    title: "Japanese Cooking Class",
    category: "Food",
    date: "Apr 12, 2026",
    time: "2:00 PM",
    location: "Cooking Studio, Tay Ho",
    attendees: 12,
    maxAttendees: 15,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=400&h=200&fit=crop",
    isInterested: true,
  },
  {
    id: 4,
    title: "Language Exchange Cafe",
    category: "Language",
    date: "Apr 15, 2026",
    time: "3:00 PM",
    location: "Tranquil Books & Coffee",
    attendees: 18,
    maxAttendees: 25,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=400&h=200&fit=crop",
    isInterested: false,
  },
  {
    id: 5,
    title: "Anime & Manga Meetup",
    category: "Entertainment",
    date: "Apr 18, 2026",
    time: "4:00 PM",
    location: "Comic City, Cau Giay",
    attendees: 32,
    maxAttendees: 40,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=400&h=200&fit=crop",
    isInterested: false,
  },
  {
    id: 6,
    title: "Traditional Tea Ceremony",
    category: "Cultural",
    date: "Apr 22, 2026",
    time: "10:00 AM",
    location: "Zen Garden Cafe, Ba Dinh",
    attendees: 8,
    maxAttendees: 12,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=200&fit=crop",
    isInterested: true,
  },
]

const categories = ["All", "Cultural", "Language", "Food", "Photography", "Entertainment"]

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
      case "Cultural":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "Language":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "Food":
        return "bg-orange-100 text-orange-700 border-orange-200"
      case "Photography":
        return "bg-pink-100 text-pink-700 border-pink-200"
      case "Entertainment":
        return "bg-cyan-100 text-cyan-700 border-cyan-200"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="w-96 border-r border-border flex flex-col bg-card">
      <div className="p-4 border-b border-border space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-foreground">Events</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="w-4 h-4" />
            Filter
            <ChevronDown className={cn("w-4 h-4 transition-transform", showFilters && "rotate-180")} />
          </Button>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search events..."
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
                {category}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto">
        {filteredEvents.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <Calendar className="w-8 h-8 mb-2 opacity-50" />
            <p>No events found</p>
          </div>
        ) : (
          <div className="p-3 space-y-3">
            {filteredEvents.map((event) => (
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
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className={cn("text-xs", getCategoryColor(event.category))}>
                      {event.category}
                    </Badge>
                  </div>
                  {event.isInterested && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-primary text-primary-foreground text-xs">
                        Interested
                      </Badge>
                    </div>
                  )}
                </div>
                <div className="p-3 bg-card">
                  <h3 className="font-semibold text-foreground line-clamp-1">{event.title}</h3>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{event.date} at {event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="w-3.5 h-3.5" />
                      <span>{event.attendees}/{event.maxAttendees} attending</span>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
