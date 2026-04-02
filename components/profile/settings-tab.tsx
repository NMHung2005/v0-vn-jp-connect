"use client"

import { useState } from "react"
import { Eye, EyeOff, Bell, BellOff, Mail, Shield, Globe, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"

interface SettingsTabProps {
  user: {
    preferences: {
      showAge: boolean
      showLocation: boolean
      emailNotifications: boolean
      pushNotifications: boolean
      profileVisibility: string
    }
  }
  onUpdate: (updates: Record<string, unknown>) => void
}

export function SettingsTab({ user, onUpdate }: SettingsTabProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const handlePreferenceChange = (key: keyof typeof user.preferences, value: boolean | string) => {
    onUpdate({
      preferences: {
        ...user.preferences,
        [key]: value,
      },
    })
  }

  return (
    <div className="p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Account Settings</h3>

      {/* Privacy Settings */}
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            Privacy Settings
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Show Age</p>
                  <p className="text-sm text-muted-foreground">Display your age on your profile</p>
                </div>
              </div>
              <Switch
                checked={user.preferences.showAge}
                onCheckedChange={(checked) => handlePreferenceChange("showAge", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Show Location</p>
                  <p className="text-sm text-muted-foreground">Display your location on your profile</p>
                </div>
              </div>
              <Switch
                checked={user.preferences.showLocation}
                onCheckedChange={(checked) => handlePreferenceChange("showLocation", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Profile Visibility</p>
                  <p className="text-sm text-muted-foreground">Who can see your profile</p>
                </div>
              </div>
              <Select
                value={user.preferences.profileVisibility}
                onValueChange={(value) => handlePreferenceChange("profileVisibility", value)}
              >
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Everyone</SelectItem>
                  <SelectItem value="connections">Connections Only</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            Notification Settings
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
              </div>
              <Switch
                checked={user.preferences.emailNotifications}
                onCheckedChange={(checked) => handlePreferenceChange("emailNotifications", checked)}
              />
            </div>

            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive push notifications</p>
                </div>
              </div>
              <Switch
                checked={user.preferences.pushNotifications}
                onCheckedChange={(checked) => handlePreferenceChange("pushNotifications", checked)}
              />
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div>
          <h4 className="text-sm font-medium text-destructive mb-4 flex items-center gap-2">
            <Trash2 className="w-4 h-4" />
            Danger Zone
          </h4>
          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Delete Account</p>
                <p className="text-sm text-muted-foreground">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete your account? This action cannot be undone.
              All your data, connections, and messages will be permanently removed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </Button>
            <Button variant="destructive">Delete My Account</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
