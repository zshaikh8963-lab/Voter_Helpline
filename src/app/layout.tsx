import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from '../contexts/LanguageContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Voter Helpline - Your Smart Election Companion',
  description: 'AI-powered platform for Indian citizens to understand elections, voter registration, and make voting easy and accessible.',
  keywords: 'voter helpline, elections india, voter registration, AI assistant, voting guide',
  authors: [{ name: 'Voter Helpline Team' }],
  openGraph: {
    title: 'Voter Helpline - Your Smart Election Companion',
    description: 'AI-powered platform for Indian citizens to understand elections and voting',
    type: 'website',
    locale: 'en_IN',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <LanguageProvider>
          <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
            {children}
          </div>
        </LanguageProvider>
      </body>
    </html>
  )
}
