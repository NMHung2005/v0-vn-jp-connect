"use client"

import { useState } from "react"
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Star, 
  Share2, 
  Heart,
  CheckCircle2,
  Globe,
  MessageCircle
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

const eventsData: Record<number, EventDetails> = {
  1: {
    id: 1,
    title: "Photography Walk in Old Quarter",
    category: "Photography",
    date: "Saturday, April 5, 2026",
    time: "9:00 AM - 12:00 PM",
    location: "Hoan Kiem Lake, Old Quarter",
    address: "Meeting point: Ngoc Son Temple entrance",
    attendees: 24,
    maxAttendees: 30,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800&h=400&fit=crop",
    isInterested: true,
    description: "Join us for a morning photography walk through Hanoi's historic Old Quarter! We'll explore the charming streets, capture the vibrant local life, and share photography tips with fellow enthusiasts from Vietnam and Japan.",
    highlights: [
      "Guided tour of photogenic spots",
      "Tips from experienced photographers",
      "Coffee break at a local cafe",
      "Photo sharing session at the end"
    ],
    languages: ["Vietnamese", "Japanese", "English"],
    organizer: {
      name: "Hiro Yamamoto",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      nationality: "JP",
      verified: true,
    },
    participants: [
      { name: "Minh", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Yuki", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Duc", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Sakura", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
    ]
  },
  2: {
    id: 2,
    title: "VN-JP Cultural Exchange Night",
    category: "Cultural",
    date: "Tuesday, April 8, 2026",
    time: "6:30 PM - 9:30 PM",
    location: "Japan Foundation, Hanoi",
    address: "27 Quang Trung, Hoan Kiem, Hanoi",
    attendees: 45,
    maxAttendees: 60,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=400&fit=crop",
    isInterested: false,
    description: "An evening celebrating Vietnamese and Japanese cultures! Experience traditional performances, cultural presentations, and make new friends in a welcoming atmosphere. Perfect for language learners and culture enthusiasts.",
    highlights: [
      "Traditional music performances",
      "Cultural presentation from both countries",
      "Networking session with refreshments",
      "Language exchange activities"
    ],
    languages: ["Vietnamese", "Japanese", "English"],
    organizer: {
      name: "Japan Foundation",
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
      nationality: "JP",
      verified: true,
    },
    participants: [
      { name: "Lan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Kenji", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Linh", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
    ]
  },
  3: {
    id: 3,
    title: "Japanese Cooking Class",
    category: "Food",
    date: "Saturday, April 12, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Cooking Studio, Tay Ho",
    address: "45 Xuan Dieu, Tay Ho, Hanoi",
    attendees: 12,
    maxAttendees: 15,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=400&fit=crop",
    isInterested: true,
    description: "Learn to make authentic Japanese dishes from a professional chef! This hands-on cooking class will teach you how to prepare sushi, miso soup, and tamagoyaki. All ingredients and equipment provided.",
    highlights: [
      "Hands-on cooking experience",
      "Learn 3 Japanese dishes",
      "Take home recipe cards",
      "Enjoy your creations together"
    ],
    languages: ["Japanese", "English"],
    organizer: {
      name: "Chef Tanaka",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=100&h=100&fit=crop&crop=face",
      nationality: "JP",
      verified: true,
    },
    participants: [
      { name: "Hoa", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Taro", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
    ]
  },
  4: {
    id: 4,
    title: "Language Exchange Cafe",
    category: "Language",
    date: "Tuesday, April 15, 2026",
    time: "3:00 PM - 6:00 PM",
    location: "Tranquil Books & Coffee",
    address: "5 Nguyen Quang Bich, Hoan Kiem, Hanoi",
    attendees: 18,
    maxAttendees: 25,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=400&fit=crop",
    isInterested: false,
    description: "Practice your Vietnamese or Japanese in a relaxed cafe setting! Meet native speakers, improve your conversation skills, and make new friends. All levels welcome - from beginners to advanced.",
    highlights: [
      "Structured conversation practice",
      "Mixed ability groups",
      "Conversation topic cards provided",
      "Free coffee for participants"
    ],
    languages: ["Vietnamese", "Japanese"],
    organizer: {
      name: "VN-JP Connect Team",
      avatar: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=100&h=100&fit=crop",
      nationality: "VN",
      verified: true,
    },
    participants: [
      { name: "Nam", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Yuki", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Mai", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
    ]
  },
  5: {
    id: 5,
    title: "Anime & Manga Meetup",
    category: "Entertainment",
    date: "Saturday, April 18, 2026",
    time: "4:00 PM - 7:00 PM",
    location: "Comic City, Cau Giay",
    address: "12 Duy Tan, Cau Giay, Hanoi",
    attendees: 32,
    maxAttendees: 40,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=400&fit=crop",
    isInterested: false,
    description: "Calling all anime and manga fans! Join us for an afternoon of discussions, trivia games, and sharing recommendations. Whether you're into classics or the latest releases, you'll find fellow enthusiasts here.",
    highlights: [
      "Anime trivia competition",
      "Manga swap corner",
      "Discussion groups by genre",
      "Cosplay welcome!"
    ],
    languages: ["Vietnamese", "Japanese", "English"],
    organizer: {
      name: "Otaku Hanoi",
      avatar: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=100&h=100&fit=crop",
      nationality: "VN",
      verified: true,
    },
    participants: [
      { name: "Akira", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Thao", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
    ]
  },
  6: {
    id: 6,
    title: "Traditional Tea Ceremony",
    category: "Cultural",
    date: "Wednesday, April 22, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "Zen Garden Cafe, Ba Dinh",
    address: "88 Lieu Giai, Ba Dinh, Hanoi",
    attendees: 8,
    maxAttendees: 12,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=400&fit=crop",
    isInterested: true,
    description: "Experience the art of Japanese tea ceremony (Chado) in a peaceful setting. Learn about the history, philosophy, and proper etiquette of this centuries-old tradition. A meditative experience for mind and soul.",
    highlights: [
      "Introduction to tea ceremony history",
      "Learn proper etiquette and gestures",
      "Taste authentic matcha",
      "Small, intimate group setting"
    ],
    languages: ["Japanese", "English"],
    organizer: {
      name: "Sensei Nakamura",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      nationality: "JP",
      verified: true,
    },
    participants: [
      { name: "Huong", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Mei", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
    ]
  },
}

interface EventDetails {
  id: number
  title: string
  category: string
  date: string
  time: string
  location: string
  address: string
  attendees: number
  maxAttendees: number
  image: string
  isInterested: boolean
  description: string
  highlights: string[]
  languages: string[]
  organizer: {
    name: string
    avatar: string
    nationality: string
    verified: boolean
  }
  participants: {
    name: string
    avatar: string
    nationality: string
  }[]
}

interface EventDetailProps {
  eventId: number
}

export function EventDetail({ eventId }: EventDetailProps) {
  const event = eventsData[eventId]
  const [isInterested, setIsInterested] = useState(event?.isInterested || false)

  if (!event) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Event not found</p>
      </div>
    )
  }

  const spotsLeft = event.maxAttendees - event.attendees
  const isFull = spotsLeft <= 0

  return (
    <div className="flex-1 overflow-y-auto bg-background">
      <div className="relative h-64 md:h-80">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <Badge className="mb-3 bg-primary text-primary-foreground">{event.category}</Badge>
          <h1 className="text-2xl md:text-3xl font-bold text-white">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="flex flex-col md:flex-row gap-4">
          <Button 
            size="lg" 
            className={cn(
              "flex-1 gap-2",
              isInterested && "bg-primary/10 text-primary border-primary hover:bg-primary/20"
            )}
            variant={isInterested ? "outline" : "default"}
            onClick={() => setIsInterested(!isInterested)}
          >
            {isInterested ? (
              <>
                <CheckCircle2 className="w-5 h-5" />
                Interested
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                Mark as Interested
              </>
            )}
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Share2 className="w-5 h-5" />
            Share
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <MessageCircle className="w-5 h-5" />
            Contact Organizer
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 p-5 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Date & Time
            </h3>
            <div className="space-y-2 pl-7">
              <p className="text-foreground font-medium">{event.date}</p>
              <p className="text-muted-foreground flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {event.time}
              </p>
            </div>
          </div>

          <div className="space-y-4 p-5 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Location
            </h3>
            <div className="space-y-2 pl-7">
              <p className="text-foreground font-medium">{event.location}</p>
              <p className="text-muted-foreground text-sm">{event.address}</p>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Attendees
            </h3>
            <span className={cn(
              "text-sm font-medium px-3 py-1 rounded-full",
              isFull 
                ? "bg-destructive/10 text-destructive" 
                : spotsLeft <= 5 
                  ? "bg-orange-100 text-orange-700"
                  : "bg-primary/10 text-primary"
            )}>
              {isFull ? "Full" : `${spotsLeft} spots left`}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-2">
              {event.participants.slice(0, 5).map((participant, index) => (
                <Avatar key={index} className="border-2 border-card w-10 h-10">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback>{participant.name[0]}</AvatarFallback>
                </Avatar>
              ))}
              {event.attendees > 5 && (
                <div className="w-10 h-10 rounded-full bg-muted border-2 border-card flex items-center justify-center text-sm font-medium text-muted-foreground">
                  +{event.attendees - 5}
                </div>
              )}
            </div>
            <span className="text-muted-foreground text-sm">
              {event.attendees} of {event.maxAttendees} attending
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground text-lg">About this event</h3>
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground text-lg">What to expect</h3>
          <ul className="space-y-3">
            {event.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            Languages
          </h3>
          <div className="flex flex-wrap gap-2">
            {event.languages.map((lang) => (
              <Badge key={lang} variant="secondary" className="text-sm">
                {lang}
              </Badge>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-xl bg-card border border-border space-y-4">
          <h3 className="font-semibold text-foreground">Organized by</h3>
          <div className="flex items-center gap-4">
            <Avatar className="w-14 h-14">
              <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
              <AvatarFallback>{event.organizer.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{event.organizer.name}</span>
                {event.organizer.verified && (
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                )}
                <Badge variant="outline" className="text-xs">
                  {event.organizer.nationality === "JP" ? "Japan" : "Vietnam"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Event Organizer</p>
            </div>
            <Button variant="outline" size="sm">
              View Profile
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
