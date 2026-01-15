import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Uniclima - Repuestos de Calderas y Aire Acondicionado',
  description: 'Tu tienda online de repuestos HVAC. Especialistas en repuestos para calderas y aire acondicionado. Envío gratis +120€, entrega 24-48h.',
  keywords: 'repuestos calderas, repuestos aire acondicionado, HVAC, Vaillant, Junkers, Baxi, Ferroli',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
