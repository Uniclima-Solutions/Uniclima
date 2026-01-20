/**
 * PÁGINA OPTIMIZADA: Repuestos de Calderas
 * 
 * Optimizaciones LCP implementadas:
 * - Server Component para Hero (renderizado inmediato)
 * - Streaming SSR con Suspense
 * - Static Generation con revalidación
 * - Preload de imágenes críticas
 * - Edge Runtime ready
 * 
 * SEO Optimizado:
 * - Title: "Repuestos de Calderas | +3.000 Referencias Originales | Uniclima"
 * - H1: "Repuestos de Calderas: Originales y Compatibles"
 */

import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { HeroSection } from "@/components/HeroSection"
import { CategoryGrid } from "@/components/CategoryGrid"
import { BrandGrid } from "@/components/BrandGrid"
import { CategoriesSkeleton, BrandsSkeleton } from "@/components/Skeletons"
import RepairPlacasSection from "@/components/RepairPlacasSection"
import { 
  ChevronRight, 
  Flame,
  Truck,
  Shield,
  Clock,
  ArrowRight,
  Phone,
  CheckCircle,
  Wrench,
  Package,
  BadgeCheck
} from "lucide-react"
import { CALDERAS_BRANDS } from "@/lib/brands"
import { JsonLd, createBreadcrumbSchema, createCollectionPageSchema, UNICLIMA_ORGANIZATION } from "@/components/JsonLd"
import type { Metadata } from 'next'

// Static Generation con revalidación cada hora
export const revalidate = 3600

// Metadata para SEO
export const metadata: Metadata = {
  title: 'Repuestos de Calderas | +3.000 Referencias Originales | Uniclima',
  description: 'Más de 3.144 repuestos de calderas originales y compatibles. Junkers, Vaillant, Baxi, Ferroli y más marcas. Envío 24-48h. Garantía 1 año.',
  openGraph: {
    title: 'Repuestos de Calderas | Uniclima',
    description: 'Más de 3.144 repuestos de calderas originales y compatibles.',
    type: 'website',
  },
}

// Categorías de Repuestos de Calderas (datos estáticos)
const repuestosCalderas = [
  { id: 1, name: "Placas", fullName: "Placas Electrónicas", slug: "placas-electronicas", image: "/images/categorias/PlacasElectronicas.webp", count: 245, popular: true },
  { id: 2, name: "Intercambiadores", fullName: "Intercambiadores de Placas", slug: "intercambiadores-placas", image: "/images/categorias/IntercambiadorDePlacas.webp", count: 189, popular: true },
  { id: 3, name: "Bombas", fullName: "Bombas de Circulación", slug: "bombas-circulacion", image: "/images/categorias/Bombas.webp", count: 156, popular: true },
  { id: 4, name: "Válvulas Gas", fullName: "Válvulas de Gas", slug: "valvulas-gas", image: "/images/categorias/ValvulaGasCondensacion.webp", count: 312, popular: true },
  { id: 5, name: "Extractores", fullName: "Extractores", slug: "extractores", image: "/images/categorias/Extractores.webp", count: 178, popular: false },
  { id: 6, name: "Bitérmicos", fullName: "Intercambiadores Bitérmicos", slug: "intercambiadores-bitermicos", image: "/images/categorias/IntercambiadorBitermico.webp", count: 98, popular: false },
  { id: 7, name: "Combustión", fullName: "Cámaras de Combustión", slug: "camaras-combustion", image: "/images/categorias/CamarasDeCombustion.webp", count: 67, popular: false },
  { id: 8, name: "Válvulas 3 Vías", fullName: "Válvulas de 3 Vías", slug: "valvulas-3-vias", image: "/images/categorias/Valvulas3Vias.webp", count: 234, popular: true },
  { id: 9, name: "Hidráulicos", fullName: "Cuerpos Hidráulicos", slug: "cuerpos-hidraulicos", image: "/images/categorias/Hidraulicos.webp", count: 145, popular: false },
  { id: 10, name: "Modulantes", fullName: "Extractores Modulantes", slug: "extractores-modulantes", image: "/images/categorias/ExtractoresModulantes.webp", count: 89, popular: false },
  { id: 11, name: "Vasos Expansión", fullName: "Vasos de Expansión", slug: "vasos-expansion", image: "/images/categorias/VasoExpansion.webp", count: 167, popular: false },
  { id: 12, name: "V. Seguridad", fullName: "Válvulas de Seguridad", slug: "valvulas-seguridad", image: "/images/categorias/ValvulasSeguridad.webp", count: 198, popular: false },
  { id: 13, name: "Sensores", fullName: "Sensores", slug: "sensores", image: "/images/categorias/Sensores.webp", count: 276, popular: true },
  { id: 14, name: "Flujostatos", fullName: "Flujostatos", slug: "flujostatos", image: "/images/categorias/Flujostato.webp", count: 123, popular: false },
  { id: 15, name: "Presostatos", fullName: "Presostatos", slug: "presostatos", image: "/images/categorias/Presostatos.webp", count: 187, popular: false },
  { id: 16, name: "Captadores", fullName: "Captadores de Presión", slug: "captadores-presion", image: "/images/categorias/CaptadorPresion.webp", count: 156, popular: false },
  { id: 17, name: "Transformadores", fullName: "Transformadores", slug: "transformadores", image: "/images/categorias/Transformadores.webp", count: 134, popular: false },
  { id: 18, name: "V. Llenado", fullName: "Válvulas de Llenado", slug: "valvulas-llenado", image: "/images/categorias/ValvulaLLenado.webp", count: 112, popular: false },
  { id: 19, name: "Microacumuladores", fullName: "Microacumuladores", slug: "microacumuladores", image: "/images/categorias/Microacumuladores.webp", count: 78, popular: false }
]

// Marcas disponibles
const marcas = CALDERAS_BRANDS

// Cálculos estáticos
const totalProductos = repuestosCalderas.reduce((acc, cat) => acc + cat.count, 0)

// Schemas para SEO
const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Inicio", url: "https://uniclima.es" },
  { name: "Repuestos de Calderas" }
])

const collectionSchema = createCollectionPageSchema(
  "Repuestos de Calderas",
  `Más de ${totalProductos.toLocaleString()} repuestos originales y compatibles para calderas de todas las marcas. Envío 24-48h y garantía 1 año.`,
  "https://uniclima.es/c/calderas",
  repuestosCalderas.map(cat => ({
    name: cat.fullName,
    url: `https://uniclima.es/c/calderas/${cat.slug}`
  }))
)

// Componente StatCard (Server Component)
function StatCard({ value, label, icon: Icon }: { value: string; label: string; icon: React.ElementType }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center">
      <Icon className="w-6 h-6 mx-auto mb-2 text-white/80" />
      <div className="text-2xl lg:text-3xl font-bold text-white">{value}</div>
      <div className="text-xs lg:text-sm text-white/70 mt-1">{label}</div>
    </div>
  )
}

// Componente de beneficios (Server Component)
function BenefitsBar() {
  const benefits = [
    { icon: Truck, text: "Envío gratis +120€", color: "text-orange-500" },
    { icon: Clock, text: "Entrega 24-48h", color: "text-orange-500" },
    { icon: Shield, text: "Garantía 1 año", color: "text-orange-500" },
    { icon: CheckCircle, text: "Repuestos verificados", color: "text-orange-500" }
  ]

  return (
    <section className="bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-wrap items-center justify-center gap-8 text-sm">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-center gap-2 text-gray-700">
              <benefit.icon className={`w-5 h-5 ${benefit.color}`} />
              <span className="font-medium">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Componente de CTA Mantenimiento (Server Component)
function MaintenanceCTA() {
  return (
    <section className="py-12 bg-gradient-to-r from-orange-500 to-orange-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-white text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              ¿Necesitas Mantenimiento Profesional?
            </h2>
            <p className="text-orange-100 text-lg">
              Contrata nuestro servicio de mantenimiento anual para tu caldera
            </p>
          </div>
          <Link
            href="/contrato-mantenimiento"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-orange-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Wrench className="w-5 h-5" />
            Ver Contratos de Mantenimiento
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}

// Componente de contenido SEO (Server Component)
function SEOContent() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
          Guía de Compra: Repuestos de Calderas
        </h2>
        
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
          <p>
            En Uniclima Solutions somos especialistas en <strong>repuestos de calderas</strong> para todas las marcas 
            y modelos del mercado. Disponemos de un amplio catálogo de componentes originales y compatibles, 
            desde placas electrónicas hasta válvulas de gas, intercambiadores y bombas de circulación.
          </p>
          
          <h3>Catálogo de Repuestos para Calderas</h3>
          <p>
            Nuestro catálogo incluye más de {totalProductos.toLocaleString()} referencias de repuestos para calderas:
          </p>
          <ul>
            <li><strong>Placas electrónicas:</strong> El cerebro de tu caldera. Disponemos de placas para Junkers, Vaillant, Saunier Duval y más.</li>
            <li><strong>Intercambiadores:</strong> Tanto de placas como bitérmicos, esenciales para la transferencia de calor.</li>
            <li><strong>Válvulas de gas:</strong> Componentes de seguridad críticos para el correcto funcionamiento.</li>
            <li><strong>Bombas de circulación:</strong> Para mantener el flujo de agua en el circuito de calefacción.</li>
            <li><strong>Sensores y termostatos:</strong> Para el control preciso de la temperatura.</li>
          </ul>
          
          <h3>Marcas de Calderas Disponibles</h3>
          <p>
            Trabajamos con las principales marcas del sector: Junkers/Bosch, Vaillant, Saunier Duval, Baxi, 
            Ferroli, Ariston, Roca, Cointra, Chaffoteaux, Beretta, Immergas y Hermann.
          </p>
          
          <h3>Envío 24-48h y Garantía de 1 Año</h3>
          <p>
            Todos nuestros repuestos incluyen <strong>1 año de garantía</strong> y envío en 24-48 horas. 
            Para pedidos superiores a 120€, el envío es gratuito en toda la península.
          </p>
        </div>
      </div>
    </section>
  )
}

// Página principal (Server Component)
export default function CalderasPage() {
  return (
    <>
      {/* Schema.org JSON-LD para SEO */}
      <JsonLd data={[UNICLIMA_ORGANIZATION, breadcrumbSchema, collectionSchema]} />
      
      <Header />
      <main className="pt-20 lg:pt-28 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Hero Section - Server Component para LCP óptimo */}
        <section className="bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 text-white relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-orange-100 text-sm mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-semibold">Repuestos Calderas</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Flame className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-black leading-tight">
                    Repuestos de Calderas
                  </h1>
                </div>
                {/* Elemento LCP - Texto renderizado inmediatamente en el servidor */}
                <p className="text-orange-100 text-lg lg:text-xl leading-relaxed">
                  Más de <span className="text-white font-bold">{totalProductos.toLocaleString()}</span> referencias de repuestos para calderas 
                  <span className="text-white font-semibold"> Junkers, Vaillant, Baxi, Ferroli</span> y más marcas.
                </p>
              </div>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
              <StatCard value={totalProductos.toLocaleString()} label="Productos" icon={Package} />
              <StatCard value={marcas.length.toString()} label="Marcas" icon={BadgeCheck} />
              <StatCard value="24-48h" label="Entrega" icon={Truck} />
              <StatCard value="1 año" label="Garantía" icon={Shield} />
            </div>
          </div>
        </section>
        
        {/* Beneficios */}
        <BenefitsBar />
        
        {/* Categorías con Suspense streaming */}
        <section className="py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">
                Repuestos de Calderas Más Buscados
              </h2>
            </div>
            
            <Suspense fallback={<CategoriesSkeleton count={6} />}>
              <CategoryGrid 
                categories={repuestosCalderas} 
                baseUrl="/c/calderas"
                showToggle={true}
              />
            </Suspense>
          </div>
        </section>
        
        {/* CTA Mantenimiento */}
        <MaintenanceCTA />
        
        {/* Banner Reparación de Placas */}
        <RepairPlacasSection />
        
        {/* Marcas con Suspense streaming */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Repuestos de Calderas por Marca
            </h2>
            
            <Suspense fallback={<BrandsSkeleton count={12} />}>
              <BrandGrid brands={marcas} columns={6} />
            </Suspense>
            
            <div className="text-center mt-8">
              <Link
                href="/marcas"
                className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
              >
                Ver todas las marcas
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
        
        {/* Contenido SEO */}
        <SEOContent />
      </main>
      <Footer />
    </>
  )
}
