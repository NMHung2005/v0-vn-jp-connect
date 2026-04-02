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
      <h3 className="text-lg font-semibold text-foreground mb-6">アカウント設定</h3>

      {/* Privacy Settings */}
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <Shield className="w-4 h-4 text-primary" />
            プライバシー設定
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Eye className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">年齢を表示</p>
                  <p className="text-sm text-muted-foreground">プロフィールに年齢を表示します</p>
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
                  <p className="font-medium text-foreground">居住地を表示</p>
                  <p className="text-sm text-muted-foreground">プロフィールに居住地を表示します</p>
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
                  <p className="font-medium text-foreground">プロフィール公開範囲</p>
                  <p className="text-sm text-muted-foreground">プロフィールを閲覧できる対象</p>
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
                  <SelectItem value="public">全員</SelectItem>
                  <SelectItem value="connections">つながりのみ</SelectItem>
                  <SelectItem value="private">非公開</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Notification Settings */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-4 flex items-center gap-2">
            <Bell className="w-4 h-4 text-primary" />
            通知設定
          </h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-medium text-foreground">メール通知</p>
                  <p className="text-sm text-muted-foreground">更新情報をメールで受け取る</p>
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
                  <p className="font-medium text-foreground">プッシュ通知</p>
                  <p className="text-sm text-muted-foreground">プッシュ通知を受け取る</p>
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
            注意が必要な操作
          </h4>
          <div className="p-4 rounded-lg border border-destructive/30 bg-destructive/5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">アカウント削除</p>
                <p className="text-sm text-muted-foreground">
                  アカウントとすべてのデータを完全に削除します
                </p>
              </div>
              <Button variant="destructive" size="sm" onClick={() => setShowDeleteDialog(true)}>
                アカウント削除
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>アカウント削除</DialogTitle>
            <DialogDescription>
              本当にアカウントを削除しますか？この操作は取り消せません。
              すべてのデータ、つながり、メッセージが完全に削除されます。
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              キャンセル
            </Button>
            <Button variant="destructive">削除を実行</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
