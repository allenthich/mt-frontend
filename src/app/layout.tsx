import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import Nav from '@/components/shared/layout/nav'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MT',
  description: 'Task Management Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className + " flex min-h-screen"}>
        <Suspense fallback="...">
          <Nav />
        </Suspense>
        <div className="container mx-auto">
          <main className="flex flex-col h-screen items-center max-w-xl mx-auto min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}
