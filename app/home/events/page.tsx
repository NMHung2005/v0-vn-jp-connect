"use client"

import { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { EventList } from "@/components/events/event-list"
import { EventDetail } from "@/components/events/event-detail"

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("events")
  const [selectedEventId, setSelectedEventId] = useState<number | null>(1)

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="flex-1 flex overflow-hidden">
        <EventList 
          selectedEventId={selectedEventId} 
          onSelectEvent={setSelectedEventId} 
        />
        
        {selectedEventId ? (
          <EventDetail eventId={selectedEventId} />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-muted/30">
            <p className="text-muted-foreground">Select an event to view details</p>
          </div>
        )}
      </div>
    </div>
  )
}
