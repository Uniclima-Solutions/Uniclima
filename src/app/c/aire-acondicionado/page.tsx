/**
 * PÁGINA OPTIMIZADA: Repuestos de Aire Acondicionado
 * 
 * Optimizaciones LCP implementadas:
 * - Server Component para Hero (renderizado inmediato)
 * - Streaming SSR con Suspense
 * - Static Generation con revalidación
 * - Preload de imágenes críticas
 * 
 * SEO Optimizado:
 * - Title: "Repuestos de Aire Acondicionado | +2.500 Referencias | Uniclima"
 * - H1: "Repuestos de Aire Acondicionado: Splits y Climatización"
 */

import { Suspense } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { CategoryGrid } from "@/components/CategoryGrid"
import { BrandGrid } from "@/components/BrandGrid"
import { CategoriesSkeleton, BrandsSkeleton } from "@/components/Skeletons"
import RepairPlacasSection from "@/components/RepairPlacasSection"
import { 
  ChevronRight, 
  Wind,
  Truck,
  Shield,
  Clock,
  ArrowRight,
  CheckCircle,
  Wrench,
  Package,
  BadgeCheck,
  Snowflake,
  Thermometer
} from "lucide-react"
import { AIRE_BRANDS } from "@/lib/brands"
import { JsonLd, createBreadcrumbSchema, createCollectionPageSchema, UNICLIMA_ORGANIZATION } from "@/components/JsonLd"
import type { Metadata } from 'next'

// Static Generation con revalidación cada hora
export const revalidate = 3600

// Metadata para SEO
export const metadata: Metadata = {
  title: 'Repuestos de Aire Acondicionado | +2.500 Referencias | Uniclima',
  description: 'Más de 2.500 repuestos de aire acondicionado originales y compatibles. Mitsubishi, Daikin, Fujitsu, LG y más marcas. Envío 24-48h. Garantía 1 año.',
  openGraph: {
    title: 'Repuestos de Aire Acondicionado | Uniclima',
    description: 'Más de 2.500 repuestos de aire acondicionado originales y compatibles.',
    type: 'website',
  },
}

// Categorías de Repuestos de Aire Acondicionado
const repuestosAire = [
  { id: 1, name: "Placas Interior", fullName: "Placas Electrónicas Interior", slug: "placas-interior", image: "/images/categorias/PlacasInterior.webp", count: 312, popular: true },
  { id: 2, name: "Placas Exterior", fullName: "Placas Electrónicas Exterior", slug: "placas-compresor", image: "/images/categorias/PlacasCompresor.webp", count: 234, popular: true },
  { id: 3, name: "Turbinas", fullName: "Turbinas de Ventilación", slug: "turbinas", image: "/images/categorias/Turbinas.webp", count: 187, popular: true },
  { id: 4, name: "Motores", fullName: "Motores de Turbina", slug: "motor-turbinas", image: "/images/categorias/MotorTurbinas.webp", count: 156, popular: true },
  { id: 5, name: "Hélices", fullName: "Hélices de Compresor", slug: "helice-compresor", image: "/images/categorias/HeliceCompresor.webp", count: 198, popular: false },
  { id: 6, name: "Motor Hélice", fullName: "Motor de Hélice Compresor", slug: "motor-helice-compresor", image: "/images/categorias/MotorHeliceCompresor.webp", count: 276, popular: true },
  { id: 7, name: "B. Conductos", fullName: "Bomba Condensados Conductos", slug: "bomba-condensado-conductos", image: "/images/categorias/BombaCondensadoConductos.webp", count: 145, popular: false },
  { id: 8, name: "B. Cassette", fullName: "Bomba Condensados Cassette", slug: "bomba-condensados-cassette", image: "/images/categorias/BombaCondensadosCassette.webp", count: 89, popular: false },
  { id: 9, name: "Mandos", fullName: "Mandos a Distancia", slug: "mandos-distancia", image: "/images/categorias/MandosDistanciaSplit.webp", count: 167, popular: true }
]

// Tipos de aire acondicionado
const tiposAire = [
  { name: "Split", icon: Wind, description: "Unidades de pared", count: 1200 },
  { name: "Multisplit", icon: Snowflake, description: "Múltiples unidades", count: 450 },
  { name: "Conductos", icon: Thermometer, description: "Instalación oculta", count: 380 },
  { name: "Cassette", icon: Package, description: "Techo comercial", count: 290 }
]

// Marcas disponibles
const marcas = AIRE_BRANDS

// Cálculos estáticos
const totalProductos = repuestosAire.reduce((acc, cat) => acc + cat.count, 0)

// Schemas para SEO
const breadcrumbSchema = createBreadcrumbSchema([
  { name: "Inicio", url: "https://uniclima.es" },
  { name: "Repuestos de Aire Acondicionado" }
])

const collectionSchema = createCollectionPageSchema(
  "Repuestos de Aire Acondicionado",
  `Más de ${totalProductos.toLocaleString()} repuestos originales y compatibles para aire acondicionado de todas las marcas. Envío 24-48h y garantía 1 año.`,
  "https://uniclima.es/c/aire-acondicionado",
  repuestosAire.map(cat => ({
    name: cat.fullName,
    url: `https://uniclima.es/c/aire-acondicionado/${cat.slug}`
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
    { icon: Truck, text: "Envío gratis +120€", color: "text-blue-500" },
    { icon: Clock, text: "Entrega 24-48h", color: "text-blue-500" },
    { icon: Shield, text: "Garantía 1 año", color: "text-blue-500" },
    { icon: CheckCircle, text: "Repuestos verificados", color: "text-blue-500" }
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

// Componente de tipos de aire (Server Component)
function TiposAireSection() {
  return (
    <section className="py-12 bg-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
          Repuestos según Tipo de Aire Acondicionado
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {tiposAire.map((tipo, index) => (
            <Link
              key={index}
              href={`/c/aire-acondicionado/tipo/${tipo.name.toLowerCase()}`}
              className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300 border border-blue-100 hover:border-blue-300 group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                <tipo.icon className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{tipo.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{tipo.description}</p>
              <span className="text-xs text-blue-600 font-medium">{tipo.count} productos</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

// Componente de CTA Mantenimiento (Server Component)
function MaintenanceCTA() {
  return (
    <section className="py-12 bg-gradient-to-r from-blue-500 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="text-white text-center lg:text-left">
            <h2 className="text-2xl lg:text-3xl font-bold mb-2">
              ¿Necesitas Mantenimiento Profesional?
            </h2>
            <p className="text-blue-100 text-lg">
              Contrata nuestro servicio de mantenimiento anual para tu aire acondicionado
            </p>
          </div>
          <Link
            href="/contrato-mantenimiento"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
          Guía de Compra: Repuestos de Aire Acondicionado
        </h2>
        
        <div className="prose prose-lg prose-gray max-w-none prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-600 prose-li:text-gray-600 prose-strong:text-gray-900">
          <p>
            En Uniclima Solutions somos especialistas en <strong>repuestos de aire acondicionado</strong> para todas las marcas 
            y modelos del mercado. Disponemos de un amplio catálogo de componentes originales y compatibles, 
            desde placas electrónicas hasta compresores, motores y turbinas.
          </p>
          
          <h3>Catálogo de Repuestos para Aire Acondicionado</h3>
          <p>
            Nuestro catálogo incluye más de {totalProductos.toLocaleString()} referencias de repuestos para aire acondicionado:
          </p>
          <ul>
            <li><strong>Placas electrónicas:</strong> El cerebro de tu equipo. Disponemos de placas para Mitsubishi, Daikin, Fujitsu y más.</li>
            <li><strong>Compresores:</strong> El corazón del sistema de refrigeración.</li>
            <li><strong>Motores y turbinas:</strong> Para la circulación del aire en unidades interiores y exteriores.</li>
            <li><strong>Mandos a distancia:</strong> Originales y compatibles para todas las marcas.</li>
            <li><strong>Sensores:</strong> Para el control preciso de la temperatura.</li>
          </ul>
          
          <h3>Marcas de Aire Acondicionado Disponibles</h3>
          <p>
            Trabajamos con las principales marcas del sector: Mitsubishi Electric, Daikin, Fujitsu, LG, Samsung, 
            Panasonic, Toshiba, Hisense, Haier, Carrier, Midea y Gree.
          </p>
          
          <h3>Mantenimiento de Aire Acondicionado</h3>
          <p>
            Un correcto mantenimiento de tu aire acondicionado es esencial para su eficiencia y durabilidad. 
            Ofrecemos <strong>contratos de mantenimiento anual</strong> que incluyen revisión completa, 
            limpieza de filtros y comprobación del gas refrigerante.
          </p>
        </div>
      </div>
    </section>
  )
}

// Página principal (Server Component)
export default function AireAcondicionadoPage() {
  return (
    <>
      {/* Schema.org JSON-LD para SEO */}
      <JsonLd data={[UNICLIMA_ORGANIZATION, breadcrumbSchema, collectionSchema]} />
      
      <Header />
      <main className="pt-20 lg:pt-28 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {/* Hero Section - Server Component para LCP óptimo */}
        <section className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
          {/* Elementos decorativos de fondo */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-blue-100 text-sm mb-8" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-white transition-colors duration-300">
                Inicio
              </Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white font-semibold">Repuestos Aire Acondicionado</span>
            </nav>
            
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
              <div className="max-w-2xl">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg">
                    <Snowflake className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="text-3xl lg:text-5xl font-black leading-tight">
                    Repuestos de Aire Acondicionado
                  </h1>
                </div>
                {/* Elemento LCP - Texto renderizado inmediatamente en el servidor */}
                <p className="text-blue-100 text-lg lg:text-xl leading-relaxed">
                  Más de <span className="text-white font-bold">{totalProductos.toLocaleString()}</span> referencias de repuestos para 
                  <span className="text-white font-semibold"> Daikin, Mitsubishi, Fujitsu, LG</span> y más marcas.
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
                Repuestos de Aire Acondicionado Más Buscados
              </h2>
            </div>
            
            <Suspense fallback={<CategoriesSkeleton count={6} />}>
              <CategoryGrid 
                categories={repuestosAire} 
                baseUrl="/c/aire-acondicionado"
                showToggle={true}
              />
            </Suspense>
          </div>
        </section>
        
        {/* Tipos de Aire */}
        <TiposAireSection />
        
        {/* CTA Mantenimiento */}
        <MaintenanceCTA />
        
        {/* Banner Reparación de Placas */}
        <RepairPlacasSection />
        
        {/* Marcas con Suspense streaming */}
        <section className="py-12 lg:py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Repuestos de Aire Acondicionado por Marca
            </h2>
            
            <Suspense fallback={<BrandsSkeleton count={12} />}>
              <BrandGrid brands={marcas} columns={6} />
            </Suspense>
            
            <div className="text-center mt-8">
              <Link
                href="/marcas"
                className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors"
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
