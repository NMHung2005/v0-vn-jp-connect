"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface ProfileAboutProps {
  user: {
    bio: string
    interests: string[]
  }
}

export function ProfileAbout({ user }: ProfileAboutProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">About Me</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bio */}
        <p className="text-foreground leading-relaxed">{user.bio}</p>

        {/* Interests */}
        <div>
          <h4 className="text-sm font-semibold text-muted-foreground mb-3">Interests</h4>
          <div className="flex flex-wrap gap-2">
            {user.interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="px-3 py-1.5 text-sm">
                {interest}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
