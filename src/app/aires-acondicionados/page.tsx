"use client";

/**
 * Página de AIRES ACONDICIONADOS - Uniclima
 * Diseño premium con animaciones, iconografía y colores corporativos
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { 
  Wind, 
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
  Snowflake,
  Sun,
  Volume2,
  Wifi,
  Leaf
} from "lucide-react";

const categoriasAC = [
  { id: "todos", nombre: "Todos", icono: Grid3X3 },
  { id: "split", nombre: "Split", icono: Wind },
  { id: "multisplit", nombre: "Multisplit", icono: Sparkles },
  { id: "inverter", nombre: "Inverter", icono: Zap },
  { id: "wifi", nombre: "Con WiFi", icono: Wifi }
];

const marcas = ["Daikin", "Mitsubishi", "Fujitsu", "LG", "Samsung", "Panasonic", "Toshiba"];

const airesAcondicionados = [
  {
    id: 1,
    nombre: "Daikin TXF35C Sensira",
    marca: "Daikin",
    tipo: "Split Inverter",
    potencia: "3.5 kW",
    frigorias: "3010 fg/h",
    precio: 699.99,
    precioAnterior: 849.99,
    descuento: 18,
    imagen: "/images/ac/daikin-sensira.webp",
    eficiencia: "A++",
    garantia: "3 años",
    destacado: true,
    decibelios: "21 dB",
    caracteristicas: ["Inverter", "Modo silencioso", "Filtro antibacterias", "R32"]
  },
  {
    id: 2,
    nombre: "Mitsubishi MSZ-AP35VGK",
    marca: "Mitsubishi",
    tipo: "Split Inverter",
    potencia: "3.5 kW",
    frigorias: "3010 fg/h",
    precio: 849.99,
    precioAnterior: 999.99,
    descuento: 15,
    imagen: "/images/ac/mitsubishi-ap.webp",
    eficiencia: "A+++",
    garantia: "5 años",
    destacado: true,
    decibelios: "19 dB",
    caracteristicas: ["WiFi integrado", "3D i-see Sensor", "Plasma Quad", "Hyper Heating"]
  },
  {
    id: 3,
    nombre: "Fujitsu ASY35UI-KP",
    marca: "Fujitsu",
    tipo: "Split Inverter",
    potencia: "3.5 kW",
    frigorias: "3010 fg/h",
    precio: 599.99,
    precioAnterior: 749.99,
    descuento: 20,
    imagen: "/images/ac/fujitsu-kp.webp",
    eficiencia: "A++",
    garantia: "3 años",
    destacado: false,
    decibelios: "22 dB",
    caracteristicas: ["Human Sensor", "Powerful Mode", "Eco Mode", "Timer 24h"]
  },
  {
    id: 4,
    nombre: "LG Dual Cool S12EQ",
    marca: "LG",
    tipo: "Split Inverter",
    potencia: "3.5 kW",
    frigorias: "3010 fg/h",
    precio: 549.99,
    precioAnterior: 649.99,
    descuento: 15,
    imagen: "/images/ac/lg-dual.webp",
    eficiencia: "A++",
    garantia: "3 años",
    destacado: false,
    decibelios: "23 dB",
    caracteristicas: ["Dual Inverter", "WiFi ThinQ", "Jet Cool", "Auto Clean"]
  },
  {
    id: 5,
    nombre: "Samsung Wind-Free AR12TXHQASINEU",
    marca: "Samsung",
    tipo: "Split Inverter",
    potencia: "3.5 kW",
    frigorias: "3010 fg/h",
    precio: 799.99,
    precioAnterior: 949.99,
    descuento: 16,
    imagen: "/images/ac/samsung-windfree.webp",
    eficiencia: "A++",
    garantia: "3 años",
    destacado: true,
    decibelios: "21 dB",
    caracteristicas: ["Wind-Free", "SmartThings", "AI Auto Cooling", "Easy Filter Plus"]
  },
  {
    id: 6,
    nombre: "Panasonic KIT-TZ35WKE",
    marca: "Panasonic",
    tipo: "Split Inverter",
    potencia: "3.5 kW",
    frigorias: "3010 fg/h",
    precio: 649.99,
    precioAnterior: null,
    descuento: 0,
    imagen: "/images/ac/panasonic-tz.webp",
    eficiencia: "A++",
    garantia: "3 años",
    destacado: false,
    decibelios: "20 dB",
    caracteristicas: ["Nanoe X", "Econavi", "Mild Dry", "WiFi opcional"]
  }
];

function ACCard({ ac }: { ac: typeof airesAcondicionados[0] }) {
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
        {ac.descuento > 0 && (
          <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full text-white text-xs font-bold">
            -{ac.descuento}%
          </span>
        )}
        {ac.destacado && (
          <span className="px-3 py-1 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full text-white text-xs font-bold flex items-center gap-1">
            <Star className="w-3 h-3" /> TOP
          </span>
        )}
        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
          ac.eficiencia === 'A+++' ? 'bg-green-500 text-white' : 'bg-green-100 text-green-700'
        }`}>
          {ac.eficiencia}
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
      <div className="relative h-56 bg-gradient-to-br from-blue-50 to-cyan-50 overflow-hidden">
        <div className={`absolute inset-0 flex items-center justify-center transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}>
          <div className="w-40 h-40 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl flex items-center justify-center">
            <Wind className="w-20 h-20 text-blue-500" />
          </div>
        </div>
        
        {/* Iconos de características */}
        <div className="absolute bottom-3 left-3 flex gap-2">
          <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center" title="Silencioso">
            <Volume2 className="w-4 h-4 text-blue-500" />
          </div>
          <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center" title="Frío">
            <Snowflake className="w-4 h-4 text-cyan-500" />
          </div>
          <div className="w-8 h-8 bg-white/90 backdrop-blur-sm rounded-lg flex items-center justify-center" title="Calor">
            <Sun className="w-4 h-4 text-orange-500" />
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-5">
        {/* Marca y tipo */}
        <div className="flex items-center gap-2 mb-2">
          <span className="px-2 py-0.5 bg-blue-100 rounded text-xs font-medium text-blue-600">{ac.marca}</span>
          <span className="text-xs text-gray-400">{ac.tipo}</span>
        </div>

        {/* Nombre */}
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors min-h-[48px]">
          {ac.nombre}
        </h3>

        {/* Características */}
        <div className="flex flex-wrap gap-1 mb-3">
          {ac.caracteristicas.slice(0, 2).map((caract, i) => (
            <span key={i} className="px-2 py-0.5 bg-gray-100 rounded text-xs text-gray-600">
              {caract}
            </span>
          ))}
        </div>

        {/* Info técnica */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Zap className="w-4 h-4" />
            {ac.potencia}
          </span>
          <span className="flex items-center gap-1">
            <Volume2 className="w-4 h-4" />
            {ac.decibelios}
          </span>
          <span className="flex items-center gap-1">
            <Shield className="w-4 h-4" />
            {ac.garantia}
          </span>
        </div>

        {/* Precios */}
        <div className="flex items-end gap-3 mb-4">
          <span className="text-2xl font-black text-blue-600">{ac.precio.toFixed(2)}€</span>
          {ac.precioAnterior && (
            <span className="text-sm text-gray-400 line-through">{ac.precioAnterior.toFixed(2)}€</span>
          )}
        </div>

        {/* Botones */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl transition-all">
            <ShoppingCart className="w-4 h-4" />
            <span>Añadir</span>
          </button>
          <Link 
            href={`/producto/${ac.id}`}
            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl transition-colors"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AiresAcondicionadosPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [categoriaActiva, setCategoriaActiva] = useState("todos");
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
        <section className="relative overflow-hidden bg-gradient-to-br from-blue-500 via-blue-600 to-cyan-600 py-12 sm:py-16 lg:py-20">
          {/* Patrón */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Copos animados */}
          <div className="absolute top-10 left-10 animate-bounce" style={{ animationDelay: '0s' }}>
            <Snowflake className="w-8 h-8 text-white/30" />
          </div>
          <div className="absolute top-20 right-20 animate-bounce" style={{ animationDelay: '0.5s' }}>
            <Snowflake className="w-6 h-6 text-white/20" />
          </div>
          <div className="absolute bottom-20 left-1/4 animate-bounce" style={{ animationDelay: '1s' }}>
            <Snowflake className="w-10 h-10 text-white/20" />
          </div>

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className={`text-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white mb-4">
                <Wind className="w-5 h-5" />
                <span className="font-semibold">Climatización de calidad</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4">
                Aires <span className="text-cyan-200">Acondicionados</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mx-auto mb-6">
                Los mejores splits y sistemas de climatización con tecnología Inverter. 
                Máxima eficiencia energética y mínimo ruido.
              </p>

              {/* Beneficios */}
              <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
                <div className="flex items-center gap-2 text-white">
                  <Leaf className="w-5 h-5 text-cyan-300" />
                  <span>Eficiencia A+++</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Volume2 className="w-5 h-5 text-cyan-300" />
                  <span>Ultra silenciosos</span>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Wifi className="w-5 h-5 text-cyan-300" />
                  <span>WiFi integrado</span>
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
                {categoriasAC.map((cat) => {
                  const Icon = cat.icono;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setCategoriaActiva(cat.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all ${
                        categoriaActiva === cat.id
                          ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg'
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
                  className={`p-2 rounded-lg transition-colors ${vistaGrid ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setVistaGrid(false)}
                  className={`p-2 rounded-lg transition-colors ${!vistaGrid ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Grid de aires */}
        <section className="py-12 sm:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Nuestros aires acondicionados</h2>
                <p className="text-gray-500 mt-1">{airesAcondicionados.length} productos disponibles</p>
              </div>
              <select className="px-4 py-2 border border-gray-200 rounded-xl text-gray-600 focus:ring-2 focus:ring-blue-500">
                <option>Ordenar por relevancia</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Más vendidos</option>
                <option>Mejor eficiencia</option>
              </select>
            </div>

            <div className={`grid gap-6 ${vistaGrid ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {airesAcondicionados.map((ac, index) => (
                <div 
                  key={ac.id}
                  className={`transition-all duration-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <ACCard ac={ac} />
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
                <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Instalación profesional desde 180€</h3>
                  <p className="text-gray-400">Técnicos certificados con más de 10 años de experiencia</p>
                </div>
              </div>
              <Link 
                href="/instalacion"
                className="flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl transition-colors"
              >
                <span>Ver instalación</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Final */}
        <section className="py-16 bg-gradient-to-br from-blue-500 to-cyan-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              ¿No sabes qué aire elegir?
            </h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Te ayudamos a calcular la potencia necesaria y elegir el modelo perfecto para tu espacio.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="tel:912345678"
                className="flex items-center gap-2 px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
              >
                <Phone className="w-5 h-5" />
                <span>912 345 678</span>
              </a>
              <Link 
                href="/contacto"
                className="flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-colors border-2 border-white/30"
              >
                <span>Calcular potencia</span>
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
