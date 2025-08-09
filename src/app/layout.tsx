import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SlotFit - Adaptive Hypertrophy Trainer',
  description: 'Smart, flexible hypertrophy workouts with real-time muscle coverage tracking',
  keywords: 'fitness, hypertrophy, workout, training, muscle building, gym',
  authors: [{ name: 'SlotFit Team' }],
  openGraph: {
    title: 'SlotFit - Adaptive Hypertrophy Trainer',
    description: 'Build powerful, balanced physiques with flexible slot-based training',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-background antialiased">
        {children}
      </body>
    </html>
  )
}