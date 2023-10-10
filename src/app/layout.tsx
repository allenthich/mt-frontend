import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import App from './_app'

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
          <App >
            {children}
          </ App>
        </body>
      </html>
  )
}
