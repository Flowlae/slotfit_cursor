'use client'

import { useAuth } from '@/context/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LogOut, User } from 'lucide-react'

export default function UserProfile() {
  const { user, signOut } = useAuth()

  if (!user) return null

  return (
    <Card className="mb-6">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="font-medium text-gray-900">
                {user.user_metadata?.full_name || user.email}
              </p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
          <Button
            onClick={signOut}
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
