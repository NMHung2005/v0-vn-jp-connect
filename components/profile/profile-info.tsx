"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Briefcase, GraduationCap, Facebook, Instagram, Linkedin, ExternalLink } from "lucide-react"

interface ProfileInfoProps {
  user: {
    occupation: string
    education: string
    socialLinks: {
      facebook?: string
      instagram?: string
      linkedin?: string
    }
  }
}

export function ProfileInfo({ user }: ProfileInfoProps) {
  const socialItems = [
    { key: "facebook", label: "Facebook", icon: Facebook, url: user.socialLinks.facebook },
    { key: "instagram", label: "Instagram", icon: Instagram, url: user.socialLinks.instagram },
    { key: "linkedin", label: "LinkedIn", icon: Linkedin, url: user.socialLinks.linkedin },
  ].filter(item => item.url)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Personal Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Occupation */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Briefcase className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Occupation</p>
            <p className="font-medium text-foreground">{user.occupation}</p>
          </div>
        </div>

        {/* Education */}
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <GraduationCap className="w-5 h-5 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Education</p>
            <p className="font-medium text-foreground">{user.education}</p>
          </div>
        </div>

        {/* Social Links */}
        {socialItems.length > 0 && (
          <div className="pt-4 border-t border-border">
            <p className="text-sm font-semibold text-muted-foreground mb-3">Social Links</p>
            <div className="space-y-2">
              {socialItems.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.key}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-muted transition-colors group"
                  >
                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-sm font-medium text-foreground">{item.label}</span>
                    <ExternalLink className="w-3.5 h-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
