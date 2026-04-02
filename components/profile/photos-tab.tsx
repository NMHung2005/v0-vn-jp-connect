"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Trash2, Star, Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

interface PhotosTabProps {
  user: {
    photos: string[]
    avatar: string
  }
  onUpdate: (updates: Record<string, unknown>) => void
}

export function PhotosTab({ user, onUpdate }: PhotosTabProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)

  const handleDeletePhoto = (photoUrl: string) => {
    const updatedPhotos = user.photos.filter((p) => p !== photoUrl)
    onUpdate({ photos: updatedPhotos })
  }

  const handleSetAsMain = (photoUrl: string) => {
    onUpdate({ avatar: photoUrl })
  }

  const handleAddPhoto = () => {
    // Simulate adding a new photo
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

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Photos</h3>
          <p className="text-sm text-muted-foreground">
            Add photos to show more about yourself (max 9 photos)
          </p>
        </div>
        <Button onClick={handleAddPhoto} size="sm" disabled={user.photos.length >= 9}>
          <Plus className="w-4 h-4 mr-1" />
          Add Photo
        </Button>
      </div>

      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-4">
        {user.photos.map((photo, index) => (
          <div
            key={photo}
            className={cn(
              "relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer group",
              photo === user.avatar ? "border-primary" : "border-transparent hover:border-primary/50"
            )}
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image src={photo} alt={`Photo ${index + 1}`} fill className="object-cover" />
            
            {/* Main Photo Badge */}
            {photo === user.avatar && (
              <div className="absolute top-2 left-2 px-2 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                Main
              </div>
            )}

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              {photo !== user.avatar && (
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleSetAsMain(photo)
                  }}
                >
                  <Star className="w-4 h-4 mr-1" />
                  Set Main
                </Button>
              )}
              <Button
                size="sm"
                variant="destructive"
                onClick={(e) => {
                  e.stopPropagation()
                  handleDeletePhoto(photo)
                }}
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}

        {/* Add Photo Placeholder */}
        {user.photos.length < 9 && (
          <button
            onClick={handleAddPhoto}
            className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Upload className="w-8 h-8" />
            <span className="text-sm font-medium">Upload</span>
          </button>
        )}
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
            <div className="relative aspect-square">
              <Image src={selectedPhoto} alt="Photo preview" fill className="object-cover" />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Tips */}
      <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border">
        <h4 className="font-semibold text-foreground mb-2">Photo Tips</h4>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>Use clear, high-quality photos that show your face</li>
          <li>Add variety - show your hobbies and interests</li>
          <li>Avoid group photos where it is hard to identify you</li>
          <li>Your main photo will be shown first to other users</li>
        </ul>
      </div>
    </div>
  )
}
