"use client";

/**
 * Página de OFERTAS - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Flame, 
  Clock, 
  Percent, 
  Tag, 
  ArrowRight, 
  Zap,
  Gift,
  Star,
  TrendingDown,
  Timer,
  Sparkles,
  BadgePercent,
  ShoppingCart,
  Heart,
  ChevronRight
} from "lucide-react";

// Datos de ofertas de ejemplo
const ofertas = [
  {
    id: 1,
    nombre: "Placa Electrónica Vaillant TurboTEC",
    imagen: "/images/boiler-parts/placa-electronica-1.webp",
    precioOriginal: 289.99,
    precioOferta: 199.99,
    descuento: 31,
    categoria: "Placas Electrónicas",
    marca: "Vaillant",
    stock: 5,
    destacado: true,
    tiempoRestante: "2d 14h"
  },
  {
    id: 2,
    nombre: "Intercambiador Junkers Cerapur",
    imagen: "/images/boiler-parts/intercambiador-1.webp",
    precioOriginal: 189.99,
    precioOferta: 129.99,
    descuento: 32,
    categoria: "Intercambiadores",
    marca: "Junkers",
    stock: 8,
    destacado: true,
    tiempoRestante: "1d 8h"
  },
  {
    id: 3,
    nombre: "Válvula de Gas Baxi Luna",
    imagen: "/images/boiler-parts/valvula-gas-1.webp",
    precioOriginal: 156.99,
    precioOferta: 99.99,
    descuento: 36,
    categoria: "Válvulas",
    marca: "Baxi",
    stock: 12,
    destacado: false,
    tiempoRestante: "5d 2h"
  },
  {
    id: 4,
    nombre: "Bomba Circuladora Ferroli",
    imagen: "/images/boiler-parts/bomba-1.webp",
    precioOriginal: 134.99,
    precioOferta: 89.99,
    descuento: 33,
    categoria: "Bombas",
    marca: "Ferroli",
    stock: 15,
    destacado: false,
    tiempoRestante: "3d 18h"
  },
  {
    id: 5,
    nombre: "Placa Interior Daikin FTXS",
    imagen: "/images/ac-parts/placa-interior-1.webp",
    precioOriginal: 245.99,
    precioOferta: 169.99,
    descuento: 31,
    categoria: "Placas AC",
    marca: "Daikin",
    stock: 4,
    destacado: true,
    tiempoRestante: "12h 45m"
  },
  {
    id: 6,
    nombre: "Motor Ventilador Mitsubishi",
    imagen: "/images/ac-parts/motor-1.webp",
    precioOriginal: 178.99,
    precioOferta: 119.99,
    descuento: 33,
    categoria: "Motores",
    marca: "Mitsubishi",
    stock: 7,
    destacado: false,
    tiempoRestante: "4d 6h"
  }
];

const categoriasFiltro = [
  { id: "todos", nombre: "Todos", icono: Sparkles },
  { id: "placas", nombre: "Placas Electrónicas", icono: Zap },
  { id: "intercambiadores", nombre: "Intercambiadores", icono: TrendingDown },
  { id: "valvulas", nombre: "Válvulas", icono: Tag },
  { id: "bombas", nombre: "Bombas", icono: Timer },
  { id: "ac", nombre: "Aire Acondicionado", icono: Star }
];

// Componente de cuenta regresiva animada
function CountdownBadge({ tiempo }: { tiempo: string }) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 rounded-full text-white text-xs font-bold animate-pulse">
      <Timer className="w-3.5 h-3.5" />
      <span>{tiempo}</span>
    </div>
  );
}

// Componente de tarjeta de oferta premium
function OfertaCard({ oferta }: { oferta: typeof ofertas[0] }) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge de descuento */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-1 px-3 py-1.5 bg-gradient-to-r from-orange-500 to-red-500 rounded-full text-white font-bold text-sm shadow-lg">
          <BadgePercent className="w-4 h-4" />
          <span>-{oferta.descuento}%</span>
        </div>
      </div>

      {/* Badge destacado */}
      {oferta.destacado && (
        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full text-white text-xs font-bold">
            <Flame className="w-3 h-3 animate-bounce" />
            <span>HOT</span>
          </div>
        </div>
      )}

      {/* Botón favorito */}
      <button 
        onClick={() => setIsFavorite(!isFavorite)}
        className="absolute top-14 right-4 z-10 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
      >
        <Heart className={`w-4 h-4 transition-colors ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
      </button>

      {/* Imagen del producto */}
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <div className="w-32 h-32 bg-gray-200 rounded-xl flex items-center justify-center">
            <Zap className="w-12 h-12 text-gray-400" />
          </div>
        </div>
        
        {/* Overlay con tiempo restante */}
        <div className="absolute bottom-3 left-3">
          <CountdownBadge tiempo={oferta.tiempoRestante} />
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Marca y categoría */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-slate-100 rounded text-xs font-medium text-slate-600">{oferta.marca}</span>
          <span className="text-xs text-gray-400">{oferta.categoria}</span>
        </div>

        {/* Nombre */}
        <h3 className="font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {oferta.nombre}
        </h3>

        {/* Precios */}
        <div className="flex items-end gap-3 mb-4">
          <span className="text-2xl font-black text-orange-600">{oferta.precioOferta.toFixed(2)}€</span>
          <span className="text-sm text-gray-400 line-through">{oferta.precioOriginal.toFixed(2)}€</span>
          <span className="ml-auto text-xs text-green-600 font-medium">Ahorras {(oferta.precioOriginal - oferta.precioOferta).toFixed(2)}€</span>
        </div>

        {/* Stock */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(100, (oferta.stock / 20) * 100)}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-medium">
            {oferta.stock < 5 ? `¡Solo ${oferta.stock}!` : `${oferta.stock} uds.`}
          </span>
        </div>

        {/* Botón */}
        <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-xl transition-all duration-300 group-hover:shadow-lg group-hover:shadow-orange-500/25">
          <ShoppingCart className="w-4 h-4" />
          <span>Añadir al carrito</span>
        </button>
      </div>

      {/* Efecto de brillo en hover */}
      <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full transition-transform duration-700 ${isHovered ? 'translate-x-full' : ''}`} />
    </div>
  );
}

export default function OfertasPage() {
  const [filtroActivo, setFiltroActivo] = useState("todos");
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Header />
      <div className="h-14 sm:h-16 lg:h-[104px]" />
      
      <main className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50">
        {/* Hero Section con animación */}
        <section className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 py-16 sm:py-20 lg:py-24">
          {/* Patrón de fondo animado */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Círculos decorativos animados */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Badge animado */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-6 animate-bounce">
                <Flame className="w-5 h-5" />
                <span className="font-semibold">Ofertas Limitadas</span>
                <Sparkles className="w-5 h-5" />
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-6">
                Ofertas <span className="text-yellow-300">Irresistibles</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-orange-100 max-w-2xl mx-auto mb-8">
                Descuentos de hasta el <span className="font-bold text-yellow-300">50%</span> en repuestos de calderas y aire acondicionado. 
                ¡No dejes escapar estas oportunidades!
              </p>

              {/* Stats animados */}
              <div className="flex flex-wrap justify-center gap-6 sm:gap-10">
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-white">50%</div>
                  <div className="text-orange-200 text-sm">Descuento máximo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-white">+200</div>
                  <div className="text-orange-200 text-sm">Productos en oferta</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-black text-white">24h</div>
                  <div className="text-orange-200 text-sm">Envío express</div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave decorativo */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
              <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="rgb(249 250 251)"/>
            </svg>
          </div>
        </section>

        {/* Filtros */}
        <section className="py-8 border-b border-gray-100 sticky top-14 sm:top-16 lg:top-[104px] bg-white/95 backdrop-blur-md z-40">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categoriasFiltro.map((cat) => {
                const Icon = cat.icono;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setFiltroActivo(cat.id)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-sm whitespace-nowrap transition-all duration-300 ${
                      filtroActivo === cat.id
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{cat.nombre}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Banner de urgencia */}
        <section className="py-6 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center animate-pulse">
                  <Gift className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-white font-bold">¡Envío GRATIS en pedidos +120€!</p>
                  <p className="text-gray-400 text-sm">Aprovecha y ahorra también en el envío</p>
                </div>
              </div>
              <Link 
                href="/tienda"
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-xl transition-colors"
              >
                <span>Ver todo el catálogo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* Grid de ofertas */}
        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Ofertas del momento</h2>
                <p className="text-gray-500 mt-1">Productos con los mejores descuentos</p>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Actualizado hace 5 min</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ofertas.map((oferta, index) => (
                <div 
                  key={oferta.id}
                  className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <OfertaCard oferta={oferta} />
                </div>
              ))}
            </div>

            {/* Botón cargar más */}
            <div className="text-center mt-12">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-xl transition-colors">
                <span>Cargar más ofertas</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 rounded-full text-orange-400 mb-6">
              <Percent className="w-5 h-5" />
              <span className="font-semibold">Ofertas exclusivas para profesionales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿Eres instalador o técnico?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Accede a descuentos adicionales de hasta el 25% sobre el precio de oferta. 
              Únete a más de 500 profesionales que ya confían en Uniclima.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/profesionales"
                className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold rounded-xl transition-all shadow-lg shadow-orange-500/25"
              >
                <Star className="w-5 h-5" />
                <span>Zona Profesionales</span>
              </Link>
              <Link 
                href="/registro"
                className="flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl transition-colors"
              >
                <span>Crear cuenta PRO</span>
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
