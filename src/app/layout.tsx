import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Script from 'next/script'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Repuestos de Calderas y Aire Acondicionado Online | Envío 24-48h | Uniclima',
  description: 'Tienda online de repuestos de calderas y aire acondicionado. Más de 5.000 referencias originales y compatibles para Junkers, Vaillant, Baxi, Daikin. Envío 24-48h. Garantía 1 año.',
  keywords: 'repuestos calderas, repuestos aire acondicionado, placas electrónicas calderas, válvulas de gas, intercambiadores, comprar repuestos calderas online, recambios climatización, HVAC España',
  authors: [{ name: 'Uniclima Solutions' }],
  creator: 'Uniclima Solutions',
  publisher: 'Uniclima Solutions',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://uniclima.es',
    siteName: 'Uniclima Solutions',
    title: 'Repuestos de Calderas y Aire Acondicionado Online | Uniclima',
    description: 'Tienda online especializada en repuestos de calderas y aire acondicionado. Más de 5.000 referencias. Envío 24-48h y garantía 1 año.',
    images: [
      {
        url: '/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'Uniclima Solutions - Repuestos HVAC',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Repuestos de Calderas y Aire Acondicionado Online | Uniclima',
    description: 'Tienda online de repuestos HVAC. Más de 5.000 referencias. Envío 24-48h y garantía 1 año.',
    images: ['/og-image.webp'],
  },
  alternates: {
    canonical: 'https://uniclima.es',
  },
  verification: {
    // google: 'tu-codigo-de-verificacion',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

// Schema Organization para SEO
const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Uniclima Solutions",
  "url": "https://uniclima.es",
  "logo": "https://uniclima.es/logo.webp",
  "description": "Especialistas en repuestos reacondicionados de climatización, probados y verificados antes del envío",
  "foundingDate": "2020",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+34-912-345-678",
    "contactType": "customer service",
    "email": "info@uniclima.es",
    "availableLanguage": ["Spanish"],
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  },
  "sameAs": [
    // Añadir URLs de redes sociales cuando estén disponibles
  ]
}

// Schema LocalBusiness para SEO local
const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Uniclima Solutions",
  "image": "https://uniclima.es/logo.webp",
  "description": "Tienda especializada en repuestos de calderas y aire acondicionado",
  "@id": "https://uniclima.es",
  "url": "https://uniclima.es",
  "telephone": "+34-912-345-678",
  "email": "info@uniclima.es",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Madrid",
    "addressRegion": "Madrid",
    "addressCountry": "ES"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "€€"
}

// Schema WebSite para búsqueda en sitio
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Uniclima Solutions",
  "url": "https://uniclima.es",
  "description": "Tienda online de repuestos de calderas y aire acondicionado",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://uniclima.es/buscar?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        {/* Preload de imágenes críticas para LCP */}
        <link rel="preload" as="image" href="/images/categorias/placa-electronica.webp" />
        <link rel="preload" as="image" href="/images/categorias/intercambiador.webp" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Schemas JSON-LD para SEO */}
        <Script
          id="organization-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <Script
          id="local-business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <Script
          id="website-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
