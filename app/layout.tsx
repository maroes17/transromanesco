import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TransRomanesco - Sistema de Gestión de Transporte',
  description: 'Sistema integral de gestión de transporte y logística',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="es" className="h-full">
        <body className={`${inter.className} h-full`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}
