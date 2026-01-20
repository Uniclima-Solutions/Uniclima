"use client";

/**
 * Página de CALDERAS COMPLETAS - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Flame, 
  Shield, 
  Clock, 
  CheckCircle2, 
  ArrowRight,
  Phone,
  Star,
  Zap,
  Euro,
  Truck,
  Award,
  Filter,
  Grid3X3,
  List,
  Heart,
  ShoppingCart,
  Sparkles,
  Leaf,
  ThermometerSun,
  Droplets
} from "lucide-react";

const categoriasCalderas = [
  { id: "todas", nombre: "Todas", icono: Grid3X3 },
  { id: "condensacion", nombre: "Condensación", icono: Leaf },
  { id: "estancas", nombre: "Estancas", icono: Flame },
  { id: "bajo-nox", nombre: "Bajo NOx", icono: Sparkles },
  { id: "mixtas", nombre: "Mixtas", icono: Droplets }
];

const marcas = ["Vaillant", "Junkers", "Baxi", "Ferroli", "Ariston", "Viessmann", "Saunier Duval"];

const calderas = [
  {
    id: 1,
    nombre: "Vaillant ecoTEC plus VMW 306/5-5",
    marca: "Vaillant",
    tipo: "Condensación",
    potencia: "30 kW",
    precio: 1899.99,
    precioAnterior: 2199.99,
    descuento: 14,
    imagen: "/images/calderas/vaillant-ecotec.webp",
    eficiencia: "A",
    garantia: "5 años",
    destacado: true,
    caracteristicas: ["Modulación 1:8", "Display LCD", "Bajo consumo", "Silenciosa"]
  },
  {
    id: 2,
    nombre: "Junkers Cerapur Comfort ZWBC 25-2C",
    marca: "Junkers",
    tipo: "Condensación",
    potencia: "25 kW",
    precio: 1599.99,
    precioAnterior: 1899.99,
    descuento: 16,
    imagen: "/images/calderas/junkers-cerapur.webp",
    eficiencia: "A",
    garantia: "3 años",
    destacado: true,
    caracteristicas: ["Compacta", "WiFi opcional", "Fácil instalación", "Eco-friendly"]
  },
  {
    id: 3,
    nombre: "Baxi Platinum Compact 24/24 F",
    marca: "Baxi",
    tipo: "Condensación",
    potencia: "24 kW",
    precio: 1399.99,
    precioAnterior: 1599.99,
    descuento: 13,
    imagen: "/images/calderas/baxi-platinum.webp",
    eficiencia: "A",
    garantia: "3 años",
    destacado: false,
    caracteristicas: ["Ultra compacta", "Bajo NOx", "Display táctil", "Conectividad"]
  },
  {
    id: 4,
    nombre: "Ferroli BlueHelix Pro 25C",
    marca: "Ferroli",
    tipo: "Condensación",
    potencia: "25 kW",
    precio: 1299.99,
    precioAnterior: 1499.99,
    descuento: 13,
    imagen: "/images/calderas/ferroli-bluehelix.webp",
    eficiencia: "A",
    garantia: "2 años",
    destacado: false,
    caracteristicas: ["Intercambiador inox", "Bomba modulante", "Autodiagnóstico", "Silenciosa"]
  },
  {
    id: 5,
    nombre: "Ariston Genus One 24",
    marca: "Ariston",
    tipo: "Condensación",
    potencia: "24 kW",
    precio: 1199.99,
    precioAnterior: null,
    descuento: 0,
    imagen: "/images/calderas/ariston-genus.webp",
    eficiencia: "A",
    garantia: "2 años",
    destacado: false,
    caracteristicas: ["WiFi integrado", "App móvil", "Eficiencia 94%", "Compacta"]
  },
  {
    id: 6,
    nombre: "Viessmann Vitodens 100-W B1HF",
    marca: "Viessmann",
    tipo: "Condensación",
    potencia: "26 kW",
    precio: 2099.99,
    precioAnterior: 2399.99,
    descuento: 13,
    imagen: "/images/calderas/viessmann-vitodens.webp",
    eficiencia: "A+",
    garantia: "5 años",
    destacado: true,
    caracteristicas: ["Inox-Radial", "Modulación 1:6", "WiFi ready", "Premium"]
  }
];

function CalderaCard({ caldera }: { caldera: typeof calderas[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
        {caldera.descuento > 0 && (
          <span className="px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white text-xs font-bold">
            -{caldera.descuento}%
          </span>
        )}
        {caldera.destacado && (
          <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full text-white text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3" /> TOP
          </span>
        )}
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          caldera.eficiencia === 'A+' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
        }`}>
          {caldera.eficiencia}
        </span>
      </div>

      {/* Favorito */}
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
      >
        <Heart className={`w-5 h-5 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
      </button>

      {/* Imagen */}
      <div className="relative h-56 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <div className="w-40 h-40 bg-gradient-to-br from-orange-100 to-orange-50 rounded-2xl flex items-center justify-center">
            <Flame className="w-20 h-20 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Marca y tipo */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium text-slate-600">{caldera.marca}</span>
          <span className="text-xs text-gray-400">{caldera.tipo}</span>
        </div>

        {/* Nombre */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[48px]">
          {caldera.nombre}
        </h3>

        {/* Características */}
        <div className="flex flex-wrap gap-1 mb-3">
          {caldera.caracteristicas.slice(0, 2).map((caract, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
              {caract}
            </span>
          ))}
        </div>

        {/* Info técnica */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <ThermometerSun className="w-4 h-4" />
            {caldera.potencia}
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            {caldera.garantia}
          </span>
        </div>

        {/* Precios */}
        <div className="flex items-end gap-3 mb-4">
          <span className="text-2xl font-black text-orange-600">{caldera.precio.toFixed(2)}€</span>
          {caldera.precioAnterior && (
            <span className="text-sm text-gray-400 line-through">{caldera.precioAnterior.toFixed(2)}€</span>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all">
            <ShoppingCart className="w-4 h-4" />
            <span>Añadir</span>
          </button>
          <Link 
            href={`/producto/${caldera.id}`}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function CalderasCompletasPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("todas");
  const [marcaActiva, setMarcaActiva] = useState("todas");
  const [vistaGrid, setVistaGrid] = useState(true);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 py-12 sm:py-16 lg:py-20">
          {/* Patrón */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-4">
                <Flame className="w-5 h-5" />
                <span className="font-semibold">Calderas de las mejores marcas</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
                Calderas <span className="text-yellow-300">Completas</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-orange-100 max-w-2xl mx-auto mb-6">
                Las mejores calderas de condensación con instalación profesional incluida. 
                Garantía de hasta 5 años y financiación sin intereses.
              </p>

              {/* Beneficios */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2 text-white">
                  <Truck className="w-5 h-5 text-yellow-300" />
                  <span>Envío gratis</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-yellow-300" />
                  <span>Garantía extendida</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Award className="w-5 h-5 text-yellow-300" />
                  <span>Instalación incluida</span>
                </div>
              </div>
            </div>
          </div>

          {/* Wave */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 80L60 70C120 60 240 40 360 30C480 20 600 20 720 25C840 30 960 40 1080 45C1200 50 1320 50 1380 50L1440 50V80H1380C1320 80 1200 80 1080 80C960 80 840 80 720 80C600 80 480 80 360 80C240 80 120 80 60 80H0Z" fill="rgb(249 250 251)"/>
            </svg>
          </div>
        </section>

        {/* Filtros */}
        <section className="py-6 border-b border-gray-100 sticky top-14 sm:top-16 lg:top-[104px] bg-white/95 backdrop-blur-md z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {/* Categorías */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
                {categoriasCalderas.map((cat) => {
                  const Icon = cat.icono;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoriaActiva(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                        categoriaActiva === cat.id
                          ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{cat.nombre}</span>
                    </button>
                  );
                })}
              </div>

              {/* Vista */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setVistaGrid(true)}
                  className={`p-2 rounded-lg transition-colors ${vistaGrid ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setVistaGrid(false)}
                  className={`p-2 rounded-lg transition-colors ${!vistaGrid ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-500'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de calderas */}
        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Nuestras calderas</h2>
                <p className="text-gray-500 mt-1">{calderas.length} productos disponibles</p>
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 focus:ring-2 focus:ring-orange-500">
                <option>Ordenar por relevancia</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Más vendidos</option>
              </select>
            </div>

            <div className={`grid gap-6 ${vistaGrid ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {calderas.map((caldera, index) => (
                <div 
                  key={caldera.id}
                  className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <CalderaCard caldera={caldera} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Banner de instalación */}
        <section className="py-12 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Instalación profesional incluida</h3>
                  <p className="text-gray-400">Todas nuestras calderas incluyen instalación por técnicos certificados</p>
                </div>
              </div>
              <Link 
                href="/instalacion"
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
              >
                <span>Más información</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-br from-orange-500 to-red-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Necesitas ayuda para elegir?
            </h2>
            <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
              Nuestros expertos te asesoran sin compromiso para encontrar la caldera perfecta para tu hogar.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:912345678"
                className="flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>912 345 678</span>
              </a>
              <Link 
                href="/contacto"
                className="flex items-center gap-2 px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-xl transition-colors border-2 border-white/30"
              >
                <span>Solicitar asesoramiento</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
