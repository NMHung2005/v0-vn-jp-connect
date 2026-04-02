"use client"

import { useState } from "react"
import { 
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Share2, 
  Heart,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"
import { useTranslations } from "next-intl"

const eventsData: Record<number, EventDetails> = {
  1: {
    id: 1,
    title: "VN-JP Cultural Exchange Night",
    category: "Cultural Exchange",
    date: "Saturday, April 5, 2026",
    time: "6:30 PM - 9:30 PM",
    location: "Japan Foundation, Hanoi",
    address: "27 Quang Trung, Hoan Kiem, Hanoi",
    attendees: 45,
    maxAttendees: 60,
    image: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=400&fit=crop",
    isInterested: true,
    description: "An evening celebrating Vietnamese and Japanese cultures! Experience traditional performances, cultural presentations, and make new friends in a welcoming atmosphere. This is a perfect opportunity for language learners and culture enthusiasts to connect with people from both Vietnam and Japan.",
    highlights: [
      "Traditional music and dance performances from both cultures",
      "Cultural presentation and sharing session",
      "Networking with refreshments and snacks",
      "Language exchange activities and games"
    ],
    participants: [
      { name: "Lan", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Kenji", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Linh", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Yuki", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
    ]
  },
  2: {
    id: 2,
    title: "Vietnamese-Japanese Language Exchange Cafe",
    category: "Language Exchange",
    date: "Tuesday, April 8, 2026",
    time: "3:00 PM - 6:00 PM",
    location: "Tranquil Books & Coffee, Hoan Kiem",
    address: "5 Nguyen Quang Bich, Hoan Kiem, Hanoi",
    attendees: 18,
    maxAttendees: 25,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800&h=400&fit=crop",
    isInterested: false,
    description: "Practice your Vietnamese or Japanese in a relaxed cafe setting! Meet native speakers from both countries, improve your conversation skills, and make new friends. All levels welcome - from beginners to advanced learners.",
    highlights: [
      "Structured conversation practice in small groups",
      "Mixed ability groups for comfortable learning",
      "Conversation topic cards provided for easy discussion",
      "Free coffee for all participants"
    ],
    participants: [
      { name: "Nam", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Sakura", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Mai", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
    ]
  },
  3: {
    id: 3,
    title: "Japanese Traditional Tea Ceremony Workshop",
    category: "Cultural Exchange",
    date: "Saturday, April 12, 2026",
    time: "10:00 AM - 12:00 PM",
    location: "Zen Garden Cafe, Ba Dinh",
    address: "88 Lieu Giai, Ba Dinh, Hanoi",
    attendees: 8,
    maxAttendees: 12,
    image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&h=400&fit=crop",
    isInterested: true,
    description: "Experience the art of Japanese tea ceremony (Chado) in a peaceful setting. Learn about the history, philosophy, and proper etiquette of this centuries-old tradition. A meditative experience for mind and soul, perfect for those interested in Japanese culture.",
    highlights: [
      "Introduction to tea ceremony history and philosophy",
      "Learn proper etiquette and traditional gestures",
      "Taste authentic matcha prepared by experienced practitioners",
      "Small, intimate group setting for personalized learning"
    ],
    participants: [
      { name: "Huong", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Mei", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
    ]
  },
  4: {
    id: 4,
    title: "VN-JP Photography Club Meetup",
    category: "Photography",
    date: "Tuesday, April 15, 2026",
    time: "8:00 AM - 11:00 AM",
    location: "West Lake, Tay Ho",
    address: "Meeting point: Truc Bach Lake entrance, Tay Ho, Hanoi",
    attendees: 22,
    maxAttendees: 30,
    image: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=400&h=200&fit=crop",
    isInterested: false,
    description: "Join Vietnamese and Japanese photography enthusiasts for a morning photo walk around the scenic West Lake area. Share tips, techniques, and cultural perspectives on photography while capturing beautiful moments of Hanoi.",
    highlights: [
      "Guided photo walk around West Lake and surrounding areas",
      "Tips sharing from experienced photographers of both countries",
      "Coffee break at a local lakeside cafe",
      "Photo review and sharing session at the end"
    ],
    participants: [
      { name: "Minh", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Hiro", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Trang", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
    ]
  },
  5: {
    id: 5,
    title: "Japanese Cooking Class - Sushi & Ramen",
    category: "Culinary Exchange",
    date: "Saturday, April 18, 2026",
    time: "2:00 PM - 5:00 PM",
    location: "Cooking Studio, Tay Ho",
    address: "45 Xuan Dieu, Tay Ho, Hanoi",
    attendees: 12,
    maxAttendees: 15,
    image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=400&fit=crop",
    isInterested: false,
    description: "Learn to make authentic Japanese dishes in this hands-on cooking class! Vietnamese and Japanese participants will cook together, share culinary traditions, and enjoy the results. All ingredients and equipment provided.",
    highlights: [
      "Hands-on cooking experience making sushi and ramen",
      "Learn authentic Japanese cooking techniques",
      "Take home recipe cards in both Vietnamese and Japanese",
      "Enjoy your delicious creations together after cooking"
    ],
    participants: [
      { name: "Hoa", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Taro", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
    ]
  },
  6: {
    id: 6,
    title: "VN-JP Anime & Manga Fan Meetup",
    category: "Pop Culture",
    date: "Wednesday, April 22, 2026",
    time: "4:00 PM - 7:00 PM",
    location: "Comic City, Cau Giay",
    address: "12 Duy Tan, Cau Giay, Hanoi",
    attendees: 35,
    maxAttendees: 50,
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&h=400&fit=crop",
    isInterested: true,
    description: "Calling all anime and manga fans from Vietnam and Japan! Join us for an afternoon of discussions, trivia games, and sharing recommendations. A perfect opportunity to connect over shared interests in Japanese pop culture.",
    highlights: [
      "Anime trivia competition with prizes",
      "Manga swap corner - bring manga to exchange",
      "Discussion groups organized by favorite genres",
      "Cosplay welcome and photo opportunities"
    ],
    participants: [
      { name: "Akira", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Thao", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Duc", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
    ]
  },
  7: {
    id: 7,
    title: "Vietnamese Ao Dai & Japanese Kimono Festival",
    category: "Cultural Exchange",
    date: "Sunday, April 26, 2026",
    time: "9:00 AM - 4:00 PM",
    location: "Temple of Literature, Dong Da",
    address: "58 Quoc Tu Giam, Van Mieu, Dong Da, Hanoi",
    attendees: 80,
    maxAttendees: 100,
    image: "https://images.unsplash.com/photo-1524413840807-0c3cb6fa808d?w=400&h=200&fit=crop",
    isInterested: false,
    description: "Celebrate the beautiful traditional costumes of Vietnam and Japan! This special festival showcases the elegant Ao Dai and Kimono, with fashion shows, photo opportunities, and cultural activities. Participants are encouraged to wear traditional clothing.",
    highlights: [
      "Traditional fashion show featuring Ao Dai and Kimono",
      "Free professional photo sessions in traditional costumes",
      "Traditional music and dance performances",
      "Cultural workshops on traditional clothing history"
    ],
    participants: [
      { name: "Linh", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Yuki", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Hung", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Emi", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
    ]
  },
  8: {
    id: 8,
    title: "VN-JP Business Networking Night",
    category: "Networking",
    date: "Wednesday, April 29, 2026",
    time: "6:00 PM - 9:00 PM",
    location: "Lotte Hotel, Ba Dinh",
    address: "54 Lieu Giai, Cong Vi, Ba Dinh, Hanoi",
    attendees: 55,
    maxAttendees: 80,
    image: "https://images.unsplash.com/photo-1515169067868-5387ec356754?w=800&h=400&fit=crop",
    isInterested: false,
    description: "Connect with Vietnamese and Japanese professionals working in Hanoi. This networking event brings together entrepreneurs, employees of Japanese companies, and Vietnamese professionals interested in Japanese business culture. Great opportunity for career development and business partnerships.",
    highlights: [
      "Speed networking sessions to meet many professionals",
      "Industry-specific discussion tables",
      "Refreshments and light dinner provided",
      "Exchange business cards and LinkedIn connections"
    ],
    participants: [
      { name: "Thanh", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
      { name: "Takeshi", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face", nationality: "JP" },
      { name: "Nga", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face", nationality: "VN" },
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
  const t = useTranslations("Events")
  let event = eventsData[eventId]
  
  // Override with translated data if it's the first event
  if (eventId === 1) {
    event = {
      ...event,
      title: t("eventDetail1.title"),
      date: t("eventDetail1.date"),
      time: t("eventDetail1.time"),
      location: t("eventDetail1.location"),
      address: t("eventDetail1.address"),
      description: t("eventDetail1.description"),
      highlights: t.raw("eventDetail1.highlights")
    }
  }

  const [isInterested, setIsInterested] = useState(event?.isInterested || false)

  if (!event) {
    return (
      <div className="flex-1 flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">{t("selectEventMessage")}</p>
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
          <Badge className="mb-3 bg-primary text-primary-foreground">{t("categories." + event.category)}</Badge>
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
                {t("leaveEvent")}
              </>
            ) : (
              <>
                <Heart className="w-5 h-5" />
                {t("joinEvent")}
              </>
            )}
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Share2 className="w-5 h-5" />
            {t("share")}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4 p-5 rounded-xl bg-card border border-border">
            <h3 className="font-semibold text-foreground flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              {t("dateAndTime")}
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
              {t("location")}
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
              {t("participants")}
            </h3>
            <span className={cn(
              "text-sm font-medium px-3 py-1 rounded-full",
              isFull 
                ? "bg-destructive/10 text-destructive" 
                : spotsLeft <= 5 
                  ? "bg-orange-100 text-orange-700"
                  : "bg-primary/10 text-primary"
            )}>
              {isFull ? "満席" : `残り ${spotsLeft} 枠`}
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
              {event.attendees} / {event.maxAttendees} {t("participating")}
            </span>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground text-lg">{t("aboutEvent")}</h3>
          <p className="text-muted-foreground leading-relaxed">{event.description}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-semibold text-foreground text-lg">{eventId === 1 ? t("eventDetail1.highlightsTitle") : "期待できること"}</h3>
          <ul className="space-y-3">
            {event.highlights.map((highlight, index) => (
              <li key={index} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-muted-foreground">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
