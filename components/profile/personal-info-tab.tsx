"use client"

import { useState } from "react"
import { Edit2, Save, X, Mail, MapPin, Briefcase, GraduationCap, User, Calendar, Flag } from "lucide-react"
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

interface PersonalInfoTabProps {
  user: {
    name: string
    email: string
    age: number
    gender: string
    nationality: string
    location: string
    occupation: string
    education: string
    socialLinks: {
      instagram: string
      facebook: string
      line: string
    }
  }
  onUpdate: (updates: Record<string, unknown>) => void
}

export function PersonalInfoTab({ user, onUpdate }: PersonalInfoTabProps) {
  const [isEditing, setIsEditing] = useState(false)
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

  const handleSave = () => {
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
    setIsEditing(false)
  }

  const handleCancel = () => {
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
    setIsEditing(false)
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
    <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm text-muted-foreground mb-1">{label}</p>
        {isEditing ? (
          <Input
            type={type}
            value={formData[field]}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [field]: type === "number" ? parseInt(e.target.value) : e.target.value,
              }))
            }
            className="h-9"
          />
        ) : (
          <p className="font-medium text-foreground">{value}</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
        {isEditing ? (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleCancel}>
              <X className="w-4 h-4 mr-1" />
              Cancel
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
            <Edit2 className="w-4 h-4 mr-1" />
            Edit
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InfoItem icon={User} label="Full Name" value={user.name} field="name" />
        <InfoItem icon={Mail} label="Email Address" value={user.email} field="email" type="email" />
        <InfoItem icon={Calendar} label="Age" value={user.age} field="age" type="number" />
        
        <div className="flex items-start gap-4 p-4 rounded-lg bg-muted/50">
          <div className="p-2 bg-primary/10 rounded-lg shrink-0">
            <User className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground mb-1">Gender</p>
            {isEditing ? (
              <Select
                value={formData.gender}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, gender: value }))}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                  <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
                </SelectContent>
              </Select>
            ) : (
              <p className="font-medium text-foreground">{user.gender}</p>
            )}
          </div>
        </div>

        <InfoItem icon={Flag} label="Nationality" value={user.nationality} field="nationality" />
        <InfoItem icon={MapPin} label="Location" value={user.location} field="location" />
        <InfoItem icon={Briefcase} label="Occupation" value={user.occupation} field="occupation" />
        <InfoItem icon={GraduationCap} label="Education" value={user.education} field="education" />
      </div>

      {/* Social Links */}
      <div className="mt-8">
        <h4 className="text-md font-semibold text-foreground mb-4">Social Links</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-muted/50">
            <Label className="text-sm text-muted-foreground">Instagram</Label>
            {isEditing ? (
              <Input
                value={formData.instagram}
                onChange={(e) => setFormData((prev) => ({ ...prev, instagram: e.target.value }))}
                placeholder="@username"
                className="mt-1 h-9"
              />
            ) : (
              <p className="font-medium text-foreground mt-1">@{user.socialLinks.instagram}</p>
            )}
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <Label className="text-sm text-muted-foreground">Facebook</Label>
            {isEditing ? (
              <Input
                value={formData.facebook}
                onChange={(e) => setFormData((prev) => ({ ...prev, facebook: e.target.value }))}
                placeholder="Username"
                className="mt-1 h-9"
              />
            ) : (
              <p className="font-medium text-foreground mt-1">{user.socialLinks.facebook}</p>
            )}
          </div>
          <div className="p-4 rounded-lg bg-muted/50">
            <Label className="text-sm text-muted-foreground">LINE</Label>
            {isEditing ? (
              <Input
                value={formData.line}
                onChange={(e) => setFormData((prev) => ({ ...prev, line: e.target.value }))}
                placeholder="LINE ID"
                className="mt-1 h-9"
              />
            ) : (
              <p className="font-medium text-foreground mt-1">{user.socialLinks.line}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
