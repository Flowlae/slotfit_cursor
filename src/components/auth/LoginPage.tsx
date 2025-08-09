'use client'

import React, { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import EmailAuth from './EmailAuth'

export default function LoginPage({ onLogin }: { onLogin: () => void }) {
  // Prevent body scrolling
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [authMode, setAuthMode] = useState<'google' | 'email'>('google')

  const handleGoogleLogin = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      })

      if (error) {
        setError(error.message)
      }
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (authMode === 'email') {
    return (
      <EmailAuth 
        onSuccess={onLogin}
        onBack={() => setAuthMode('google')}
      />
    )
  }

  return (
    <div className="h-screen flex items-start justify-center bg-white pt-8" style={{ height: '100vh', overflow: 'hidden' }}>
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center pb-3">
          <div className="mb-2">
            <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full mx-auto flex items-center justify-center">
              <span className="text-white text-xl font-bold">S</span>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Welcome to SlotFit
          </CardTitle>
          <CardDescription className="text-sm text-gray-600">
            Your adaptive strength training companion
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3 pb-4">
          <Button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full h-10 text-base font-medium bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600"></div>
                <span>Signing in...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </div>
            )}
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">Or</span>
            </div>
          </div>

          <Button
            onClick={() => setAuthMode('email')}
            variant="outline"
            className="w-full h-10 text-base font-medium"
          >
            Continue with Email
          </Button>
          
          {error && (
            <div className="text-red-600 text-sm text-center p-3 bg-red-50 rounded-md">
              {error}
            </div>
          )}
          
          <div className="text-center text-xs text-gray-500">
            <p>By continuing, you agree to our Terms of Service and Privacy Policy</p>
            <p className="mt-1">Powered by Supabase • Secure & Private</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
