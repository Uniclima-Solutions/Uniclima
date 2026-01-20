// Server Component - NO 'use client' directive
// Este componente se renderiza en el servidor para LCP óptimo

import { Flame, Wind, Wrench, Shield, Truck, Clock } from 'lucide-react'

interface Stat {
  icon: React.ReactNode
  value: string
  label: string
}

interface HeroSectionProps {
  title: string
  subtitle: string
  stats?: Stat[]
  variant?: 'calderas' | 'aire' | 'default'
  breadcrumb?: {
    items: { label: string; href?: string }[]
  }
}

const variantStyles = {
  calderas: {
    gradient: 'from-orange-600 via-orange-500 to-amber-500',
    accentColor: 'orange',
    iconBg: 'bg-orange-500/20',
  },
  aire: {
    gradient: 'from-blue-600 via-blue-500 to-cyan-500',
    accentColor: 'blue',
    iconBg: 'bg-blue-500/20',
  },
  default: {
    gradient: 'from-gray-800 via-gray-700 to-gray-600',
    accentColor: 'gray',
    iconBg: 'bg-gray-500/20',
  },
}

export function HeroSection({
  title,
  subtitle,
  stats,
  variant = 'default',
  breadcrumb,
}: HeroSectionProps) {
  const styles = variantStyles[variant]

  return (
    <section 
      className={`relative bg-gradient-to-br ${styles.gradient} overflow-hidden`}
      // Inline critical styles for faster LCP
      style={{ minHeight: '320px' }}
    >
      {/* Background decorative elements - rendered server-side */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-black/10 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        {/* Breadcrumb */}
        {breadcrumb && (
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm text-white/70">
              {breadcrumb.items.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {item.href ? (
                    <a href={item.href} className="hover:text-white transition-colors">
                      {item.label}
                    </a>
                  ) : (
                    <span className="text-white">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          {/* Main content - LCP element */}
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {title}
            </h1>
            {/* Este es el elemento LCP - texto renderizado inmediatamente */}
            <p className="mt-4 text-lg lg:text-xl text-white/90 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Stats cards */}
          {stats && stats.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 lg:gap-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className={`${styles.iconBg} backdrop-blur-sm rounded-2xl p-4 text-center`}
                >
                  <div className="flex justify-center mb-2 text-white/80">
                    {stat.icon}
                  </div>
                  <div className="text-2xl lg:text-3xl font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs lg:text-sm text-white/70 mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

// Pre-built hero configurations for common pages
export const calderasHeroConfig = {
  title: 'Repuestos de Calderas: Originales y Compatibles',
  subtitle: 'Más de 3,144 referencias de repuestos para calderas Junkers, Vaillant, Baxi, Ferroli y más. Envío en 24-48h y garantía de 1 año en todos los productos.',
  variant: 'calderas' as const,
  stats: [
    { icon: <Wrench className="w-6 h-6" />, value: '3,144+', label: 'Referencias' },
    { icon: <Shield className="w-6 h-6" />, value: '25+', label: 'Marcas' },
    { icon: <Truck className="w-6 h-6" />, value: '24-48h', label: 'Envío' },
  ],
  breadcrumb: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Repuestos', href: '/repuestos' },
      { label: 'Calderas' },
    ],
  },
}

export const aireHeroConfig = {
  title: 'Repuestos de Aire Acondicionado: Splits y Climatización',
  subtitle: 'Más de 2,500 referencias de repuestos para aire acondicionado Mitsubishi, Daikin, Fujitsu, LG y más. Envío en 24-48h y garantía de 1 año.',
  variant: 'aire' as const,
  stats: [
    { icon: <Wind className="w-6 h-6" />, value: '2,500+', label: 'Referencias' },
    { icon: <Shield className="w-6 h-6" />, value: '12+', label: 'Marcas' },
    { icon: <Clock className="w-6 h-6" />, value: '24-48h', label: 'Envío' },
  ],
  breadcrumb: {
    items: [
      { label: 'Inicio', href: '/' },
      { label: 'Repuestos', href: '/repuestos' },
      { label: 'Aire Acondicionado' },
    ],
  },
}
